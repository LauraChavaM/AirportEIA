const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authService = require("../services/authService");

router.get("/",authService, userController.getUsers);
router.post("/addUser",authService, userController.addUser);
router.post("/:id",authService, userController.updateUser);

module.exports = router;