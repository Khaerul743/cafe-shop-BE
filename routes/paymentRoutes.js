const expres = require("express");
const router = expres.Router();
const { transaction } = require("../middlewares/transaction");
const {
  getAllPayment,
  getbyOrderId,
  addPayment,
  updatePayment,
  deletePayment,
  createTransaction,
  midtransNotification,
} = require("../controller/paymentController");

router.get("/", getAllPayment);
router.get("/:order_id", getbyOrderId);
router.post("/", addPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

router.post("/transaction", transaction, createTransaction);
router.post("/midtrans_notification", transaction, midtransNotification);

module.exports = router;
