const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;
