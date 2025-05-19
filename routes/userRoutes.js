const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authService = require("../services/authService");

router.get("/",authService, userController.getUsers);
router.post("/addUser", userController.addUser);
router.post("/:id",authService, userController.updateUser);
router.post("/ChangeStatus/:id", authService,userController.changeUserStatus);

module.exports = router;