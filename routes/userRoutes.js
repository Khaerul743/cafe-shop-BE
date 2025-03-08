const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwt");
const {
  getAllUser,
  getUserById,
  userProfile,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");

router.get("/", verifyToken, getAllUser);
router.get("/profile", verifyToken, userProfile);
router.get("/:id", getUserById);
router.put("/:id", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;
