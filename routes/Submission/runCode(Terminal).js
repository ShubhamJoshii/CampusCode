const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const crypto = require("crypto");
const util = require("util");
const Problems = require("../../models/Problems");
const { execFile } = require("child_process");
const buildJavaInput = require("../../util/buildJavaInput");

const execPromise = util.promisify(exec);

const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}


function runJava(command, args, input) {
  return new Promise((resolve, reject) => {
    const child = execFile(
      command,
      args,
      { timeout: 5000, maxBuffer: 1024 * 500 },
      (err, stdout, stderr) => {
        if (err && err.killed) return reject("Memory or Time Limit Exceeded");
        if (stderr) return reject(stderr);
        resolve(stdout);
      },
    );

    child.stdin.write(input);
    child.stdin.end();
  });
}

function parseOutput(str) {
  return str.trim().split(/\s+/).filter(Boolean).map(Number);
}

function normalize(arr) {
  return JSON.stringify(arr);
}

router.post("/runcode", async (req, res) => {
  const { code, language, _id } = req.body;
  const jobId = crypto.randomBytes(4).toString("hex");
  let filesCreated = [];

  try {
    // 1. Fetch Problem
    const problemDetail = await Problems.findById(_id).lean();

    if (
      !problemDetail ||
      !problemDetail.judgeCode ||
      !problemDetail.judgeCode[language]
    ) {
      return res.status(400).json({ error: "Judge code template not found." });
    }

    const template = problemDetail.judgeCode[language];
    // console.log(problemDetail.testCases);
    const finalCode = template.replace("/*USER_CODE*/", code);

    if (language === "java") {
      // console.log(code, language, _id);
      const className = `Main_${jobId}`;
      const fileName = path.join(tempDir, `${className}.java`);
      filesCreated.push(fileName, path.join(tempDir, `${className}.class`));

      // Replace "public class Main" with the unique class name
      const javaCodeReady = finalCode.replace(
        /public\s+class\s+Main/g,
        `public class ${className}`,
      );
      fs.writeFileSync(fileName, javaCodeReady);

      await execPromise(`javac ${fileName}`, { timeout: 5000 });

      const results = [];

      for (const tc of problemDetail.testCases) {
        const input = buildJavaInput(tc, problemDetail.tags[0]);

        const stdout = await runJava(
          "java",
          ["-cp", tempDir, className],
          input,
        );

        const actualArr = parseOutput(stdout);
        const expectedArr = tc.output;

        const passed = normalize(actualArr) === normalize(expectedArr);

        results.push({
          input,
          expected: expectedArr,
          actual: actualArr,
          passed,
        });
      }

      return res.json({
        success: true,
        results,
        summary: {
          total: results.length,
          passed: results.filter((r) => r.passed).length,
        },
      });
    } else {
      res.status(400).json({ error: "Language not supported" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      error: error.stderr || error.message,
      details: "Compilation or Runtime Error",
    });
  } finally {
    // 3. Cleanup
    // filesCreated.forEach((file) => {
    //   if (fs.existsSync(file)) {
    //     try { fs.unlinkSync(file); } catch (e) {}
    //   }
    // });
  }
});

module.exports = router;
