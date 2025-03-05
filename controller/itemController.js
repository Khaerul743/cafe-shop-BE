const { OrderItem, Product } = require("../models/relations");
const { response } = require("../utils/response");

const getItemByOrderId = async (req, res) => {
  const order_id = req.params.order_id;
  try {
    const getItem = await OrderItem.findAll({ where: { order_id } });
    response(
      res,
      200,
      true,
      "Get order item by order id is successfully",
      getItem
    );
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const addOrderItem = async (req, res) => {
  const product_id = req.params.product_id;
  const order_id = req.params.order_id;
  const { quantity } = req.body;
  try {
    //Cek apakah product ada
    const getProduct = await Product.findByPk(product_id);
    if (!getProduct) return response(res, 404, false, "Product not found");

    const price = getProduct.price;
    const subTotal_price = price * quantity;
    const addItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
      price,
      subTotal_price,
    });
    if (!addItem) return response(res, 400, false, "Invalid to add order item");
    response(res, 200, true, "add order item is successfully", addItem);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

module.exports = { getItemByOrderId, addOrderItem };
