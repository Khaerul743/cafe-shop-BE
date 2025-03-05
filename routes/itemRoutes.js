const express = require("express");
const router = express.Router();
const {
  getItemByOrderId,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controller/itemController");

router.get("/:order_id", getItemByOrderId);
router.post("/:order_id/:product_id", addOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
