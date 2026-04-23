const express = require("express");
const Problems = require("../../models/Problems");
const router = express.Router();

router.get("/problems", async (req, res) => {
  // console.log("Hello world");
  try {
    let { pageNo = 1, limit = 10, difficulty, tag } = req.query;

    pageNo = parseInt(pageNo);
    limit = parseInt(limit);

    const filter = {};
    if (difficulty) {
      filter.difficulty = difficulty.toLowerCase();
    }

    if (tag && tag.toLowerCase() !== "all") {
      const tagsArray = tag.split(",");
      filter.tags = { $in: tagsArray };
    }

    const [problems, categories, totalCount] = await Promise.all([
      Problems.find(filter)
        .select("title difficulty tags")
        .limit(limit)
        .skip((pageNo - 1) * limit),
      Problems.distinct("tags"),
      Problems.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data: problems,
      categories: ["all", ...categories],
      pagination: {
        total: totalCount,
        page: pageNo,
        limit: limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
