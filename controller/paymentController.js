const { Transaction, where } = require("sequelize");
const { Payment, Order, User } = require("../models/relations");
const { response } = require("../utils/response");
const snap = require("../config/midtrans");
const { transaction } = require("../middlewares/transaction");

const getAllPayment = async (req, res) => {
  try {
    const getAllPayment = await Payment.findAll();
    response(res, 200, true, "Get all payment is successfully", getAllPayment);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const getbyOrderId = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    //Cek apakah order id itu ada
    const orderExist = await Order.findByPk(order_id);
    if (!orderExist) return response(res, 404, false, "Order not found");

    const getPayment = await Payment.findAll({ where: { order_id } });

    response(res, 200, true, "Get payment is successfully", getPayment);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const addPayment = async (req, res) => {
  const { payment_method, amount, status } = req.body;
  try {
    const addPayment = await Payment.create({ payment_method, amount, status });
    if (!addPayment)
      return response(res, 400, false, "Invalid to add data payment");
    return response(res, 200, true, "Add data payment is successfully");
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const updatePayment = async (req, res) => {
  const id = req.params.id;
  const { payment_method, amount, status } = req.body;
  try {
    const paymentExist = await Payment.findByPk(id);
    if (!paymentExist)
      return response(res, 404, false, "Data payment not found");

    const updatePayment = await Payment.update(
      {
        payment_method,
        amount,
        status,
      },
      {
        where: { id },
      }
    );

    response(res, 200, true, "Update data payment is successfully");
  } catch (error) {
    response(res, 500, true, error.message);
    console.log(error);
  }
};

const deletePayment = async (req, res) => {
  const id = req.params.id;
  try {
    const paymentExist = await Payment.findByPk(id);
    if (!paymentExist) return response(res, 404, false, "Data not found");

    const deletePayment = await Payment.destroy({ where: { id } });
    if (!deletePayment)
      return response(res, 400, false, "Invalid to delete data");
    response(res, 200, true, "delete data is succefully", {
      row: deletePayment,
    });
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const createTransaction = async (req, res) => {
  const t = req.transaction;
  const order_id = req.body.order_id;
  try {
    const getOrder = await Order.findByPk(order_id);
    const { id, user_id, total_price } = getOrder;
    const getUser = await User.findByPk(user_id);
    const { username, email } = getUser;
    if (!getOrder || !getUser)
      return response(res, 404, false, "User or order not found");

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: total_price,
      },
      customer_details: {
        first_name: username,
        email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.status(201).json({
      message: "Transaksi telah dibuat",
      payment_url: transaction.redirect_url,
    });

    await getOrder.update({ status: "process" }, { transaction: t });
    await Payment.create(
      {
        order_id,
        amount: total_price,
        status: "process",
      },
      { transaction: t }
    );
    await t.commit();
  } catch (error) {
    await t.rollback();
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const midtransNotification = async (req, res) => {
  console.log(req.body);
  const t = req.transaction;
  const { order_id, transaction_status, payment_type } = req.body;
  const getPayment = await Payment.findOne({ where: { order_id } });
  const getOrder = await Order.findByPk(order_id);
  try {
    if (transaction_status === "settlement") {
      console.log(`✅ Pembayaran sukses! Order ID: ${order_id}`);
      await getPayment.update({ payment_method: payment_type, status: "paid" });
      await getOrder.update({ status: "complete" });
      return res.status(200).send("ok");
    } else if (transaction_status === "pending") {
      console.log(`⌛ Pembayaran pending: ${order_id}`);
      return res.status(201).json({ message: "Transaksi sedang diproses." });
    } else {
      console.log(`❌ Pembayaran gagal / dibatalkan: ${order_id}`);
      await getPayment.update({
        payment_method: payment_type,
        status: "cancelled",
      });
      await getOrder.update({ status: "cancelled" });
      return res
        .status(400)
        .json({ message: "Transaksi gagal atau kadaluarsa." });
    }
  } catch (error) {
    console.error("❌ Error Webhook:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllPayment,
  getbyOrderId,
  addPayment,
  updatePayment,
  deletePayment,
  createTransaction,
  midtransNotification,
};
