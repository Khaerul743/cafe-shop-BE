const express = require("express");
const router = express.Router();
const {
  getAllOrder,
  getOrderByUserId,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

router.get("/", getAllOrder);
router.get("/:user_id", getOrderByUserId);
router.post("/:user_id", addNewOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
