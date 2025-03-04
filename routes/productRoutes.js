const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getProductById,
  updateProduct,
} = require("../controller/productController");

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);

module.exports = router;
