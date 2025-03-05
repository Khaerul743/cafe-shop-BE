const { Payment, Order } = require("../models/relations");
const { response } = require("../utils/response");

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

module.exports = {
  getAllPayment,
  getbyOrderId,
  addPayment,
  updatePayment,
  deletePayment,
};
