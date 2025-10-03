const express = require("express");
const router = express.Router();
const { getMuscle_groups, getMuscle_groupById, createMuscle_group, updateMuscle_group, deleteMuscle_group } = require("../../controllers/muscle_groups.controller");

router.get("/", getMuscle_groups);
router.get("/:id", getMuscle_groupById);
router.post("/", createMuscle_group);
router.put("/:id", updateMuscle_group);
router.delete("/:id", deleteMuscle_group);

module.exports = router;
