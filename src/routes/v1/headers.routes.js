const express = require("express");
const router = express.Router();
const { checkHeaders, getDataWithHeaders } = require("../../controllers/header.controller");

router.get("/check-headers", checkHeaders);
router.get("/data", getDataWithHeaders);

module.exports = router;
