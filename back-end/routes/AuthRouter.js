const express = require("express");
const registerController = require("../controllers/SignupController");
const router = express.Router();

// Register Router

router.post("/register", registerController.register);

module.exports = router;
