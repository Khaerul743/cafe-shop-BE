const { Order } = require("../models/relations");
const { response } = require("../utils/response");

const getAllOrder = async (req, res) => {
  try {
    //mengambil semua order di database
    const getOrders = await Order.findAll();
    console.log(getOrders);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};
