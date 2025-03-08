const express = require("express");
const router = express.Router();
const { authorizationRoles } = require("../middlewares/authRole");
const { verifyToken } = require("../middlewares/jwt");
const {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.get("/", verifyToken, authorizationRoles("customer"), getAllProduct);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
