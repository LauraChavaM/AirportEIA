const express = require("express");
const router = express.Router();
const authenticationController = require("../controller/authenticationController");

router.post("/login", authenticationController.login);

module.exports = router;