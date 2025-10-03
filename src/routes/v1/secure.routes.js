const express = require("express");
const router = express.Router();
const { getSecureData } = require("../../controllers/secure.controller");
const checkApiKey = require("../../middlewares/checkApiKey");

router.get("/secure-data", checkApiKey, getSecureData);

module.exports = router;

