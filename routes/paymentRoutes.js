const expres = require("express");
const router = expres.Router();
const {
  getAllPayment,
  getbyOrderId,
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controller/paymentController");

router.get("/", getAllPayment);
router.get("/:order_id", getbyOrderId);
router.post("/", addPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
