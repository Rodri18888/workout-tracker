const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, patchUser } = require("../../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);

module.exports = router;
