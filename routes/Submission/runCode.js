const express = require("express");
const router = express.Router();
const fs = require("fs");

const wrappedCodeJava = (userCode) => `
import java.util.*;
${userCode}
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.twoSum(2, 3));
    }
}
`;

const wrappedCodeCpp = (userCode) => `
#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
    Solution sol;
    cout << sol.twoSum(2, 3) << endl;
    return 0;
}
`;

router.post("/runcode", async (req, res) => {
  const { code, language, input } = req.body;

  try {
    const { exec } = require("child_process");

    if (language === "java") {
      fs.writeFileSync("Main.java", wrappedCodeJava(code));

      exec("javac Main.java && java Main", (err, stdout, stderr) => {
        if (err) return res.json({ error: stderr });
        return res.json({ output: stdout });
      });

    } else if (language === "cpp") {
      fs.writeFileSync("main.cpp", wrappedCodeCpp(code));

      exec("g++ main.cpp -o main && main.exe", (err, stdout, stderr) => {
        if (err) return res.json({ error: stderr });
        return res.json({ output: stdout });
      });

    } else {
      return res.json({ error: "Unsupported language" });
    }

  } catch (error) {
    return res.json({ error: error.message });
  }
});

module.exports = router;