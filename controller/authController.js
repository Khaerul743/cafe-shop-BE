const { User } = require("../models/relations");
const { response } = require("../utils/response");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { registerSchema, loginSchema } = require("../config/validation");

const registerHandler = async (req, res) => {
  const data = req.body;
  try {
    //cek apakah email sudah digunakan
    const isEmailExist = await User.findOne({ where: { email: data.email } });
    if (isEmailExist)
      return response(res, 409, false, "Email is already to use");

    //validasi input
    const { error } = registerSchema.validate(data, { abortEarly: false });
    if (error)
      return response(
        res,
        400,
        false,
        error.details.map((err) => err.message)
      );

    //hash password
    const hashedPass = await hashPass(req.body.password, 10);
    req.body.password = hashedPass;

    //menyimpan data user ke database
    const { username, email, password } = req.body;
    const addUser = await User.create({ username, email, password });
    response(res, 201, true, "Register new user is successfully", {
      username,
      email,
    });
  } catch (error) {
    response(res, 500, false, error.message);
  }
};

const loginHandler = async (req, res) => {
  const data = req.body;
  try {
    //validasi input user
    const { error } = loginSchema.validate(data, { abortEarly: false });
    if (error)
      return response(
        res,
        400,
        false,
        error.details.map((err) => err.message)
      );

    //cek apakah user ada
    const isUserExist = await User.findOne({ where: { email: data.email } });
    if (!isUserExist) return response(res, 404, false, "User not found");

    //cek apakah password valid
    const validationPass = await comparePass(
      isUserExist.password,
      data.password
    );
    if (!validationPass) return response(res, 400, false, "Invalid password");

    response(res, 200, true, "Login is successfully");
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

module.exports = { registerHandler, loginHandler };
