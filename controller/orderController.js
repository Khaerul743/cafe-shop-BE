const { Order, User } = require("../models/relations");
const { response } = require("../utils/response");

const getAllOrder = async (req, res) => {
  try {
    //mengambil semua order di database
    const getOrders = await Order.findAll();

    response(res, 200, true, "Get all order is successfully", getOrders);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const getOrderByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const getOrder = await Order.findAll({ where: { user_id } });
    if (!getOrder) return response(res, 404, false, "Order is not defined");
    response(res, 200, true, "Get order by user_id is successfully", getOrder);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const addNewOrder = async (req, res) => {
  const user_id = req.params.user_id;
  const { total_price } = req.body;
  try {
    //Cek apakah user ada
    const isUserExist = await User.findByPk(user_id);
    if (!isUserExist) return response(res, 404, false, "User not found");

    //menambahkan order
    const addOrder = await Order.create({ user_id, total_price });
    if (!addOrder) return response(res, 400, false, "Invalid add order");

    response(res, 200, true, "Add order is successfully", addOrder);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updateOrder = await Order.update(
      {
        status,
      },
      {
        where: { id },
      }
    );
    if (![updateOrder])
      return response(res, 400, false, "Invalid to update order");
    response(res, 200, true, "Update order is successfully", {
      rows: updateOrder,
    });
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteOrder = await Order.destroy({ where: { id } });
    if (!deleteOrder)
      return response(res, 400, false, "Invalid to delete order");
    response(res, 200, true, "delete order is successfully", {
      row: deleteOrder,
    });
  } catch (error) {
    response(res, 500, true, error.message);
    console.log(error);
  }
};
module.exports = {
  getAllOrder,
  getOrderByUserId,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
