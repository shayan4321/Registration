const express = require("express");
const registerController = require("../controllers/registerController");
//routes
const router = express.Router();

// Register Router

router.post("/register", registerController.register);

module.exports = router;
