const { Product } = require("../models/relations");
const { response } = require("../utils/response");

const getAllProduct = async (req, res) => {
  try {
    //Mengambil semua data product
    const products = await Product.findAll();
    response(res, 200, true, "Get all products", products);
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    //mengambil data berdasarkan id
    const product = await Product.findByPk(id);
    //cek apakah product ada
    if (!product) return response(res, 404, false, "Product not found");
    return response(res, 200, true, "Get product by id", product);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, category, stock, price } = req.body;
  try {
    //cek product apakah ada
    const product = await Product.findByPk(id);
    if (!product) return response(res, 404, false, "Product not found");

    //update product
    const [data, updated] = await Product.update(
      {
        name,
        category,
        stock,
        price,
      },
      {
        where: { id },
      }
    );

    //Cek apakah product ter update
    if (!data) return response(res, 400, false, "Invalid to update product");

    response(res, 200, "Update product is successfully", { row: data });
  } catch (error) {}
};

module.exports = { getAllProduct, getProductById, updateProduct };
