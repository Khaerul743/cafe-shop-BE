const express = require("express");
const router = express.Router();
const {
  registerHandler,
  loginHandler,
} = require("../controller/authController");

router.post("/register", registerHandler);
router.post("/login", loginHandler);

module.exports = router;
