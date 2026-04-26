const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const Group = require("../../models/Group");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/groupdetails/:_id/problems", authMiddleware, async (req, res) => {
  const _id = req.params._id;

  let { pageNo = 1, limit = 10, difficulty, tag } = req.query;

  pageNo = Math.max(1, parseInt(pageNo) || 1);
  limit = Math.max(1, parseInt(limit) || 10);

  const skip = (pageNo - 1) * limit;

  try {
    const group = await Group.findById(_id)
      .select("problems")
      .populate("problems.problem", "title difficulty tags");

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const groupObj = group.toObject();

    // ✅ flatten all problems
    let allProblems = groupObj.problems
      .filter((p) => p.problem)
      .map((p) => ({
        ...p.problem,
        addedAt: p.addedAt,
      }));

    // ✅ 🟢 STEP 1: categories from FULL list (before filtering)
    const categoriesSet = new Set();
    allProblems.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => categoriesSet.add(t));
      }
    });

    const categories = ["all", ...categoriesSet];

    // ✅ STEP 2: apply filters
    let filteredProblems = [...allProblems];

    if (difficulty) {
      filteredProblems = filteredProblems.filter(
        (p) => p.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (tag && tag.toLowerCase() !== "all") {
      const tagsArray = tag.split(",");
      filteredProblems = filteredProblems.filter((p) =>
        p.tags?.some((t) => tagsArray.includes(t))
      );
    }

    // ✅ STEP 3: pagination AFTER filtering
    const totalQuestions = filteredProblems.length;
    const paginatedProblems = filteredProblems.slice(skip, skip + limit);

    const pagination = {
      total: totalQuestions,
      page: pageNo,
      limit: limit,
      totalPages: Math.ceil(totalQuestions / limit),
    };

    res.status(200).json({
      success: true,
      data: {
        problems: paginatedProblems,
        categories, // 👈 from full dataset
        pagination,
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