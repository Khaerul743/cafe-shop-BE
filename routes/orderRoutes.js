const express = require("express");
const router = express.Router();
const {
  getAllOrder,
  getOrderByUserId,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const { transaction } = require("../middlewares/transaction");

router.get("/", getAllOrder);
router.get("/:user_id", getOrderByUserId);
router.post("/:user_id", transaction, addNewOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
