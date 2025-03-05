const express = require("express");
const router = express.Router();
const {
  getItemByOrderId,
  addOrderItem,
} = require("../controller/itemController");

router.get("/:order_id", getItemByOrderId);
router.post("/:order_id/:product_id", addOrderItem);

module.exports = router;
