const express = require("express");
const router = express.Router();
const { getReports, getReportById, createReport, updateReport, patchReport, deleteReport} = require("../../controllers/reports.controller");

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", createReport);
router.put("/:id", updateReport);
router.patch("/:id", patchReport);
router.delete("/:id", deleteReport);

module.exports = router;
