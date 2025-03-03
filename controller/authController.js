const { User } = require("../models/relations");
const { response } = require("../utils/response");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { registerSchema } = require("../config/validation");

const register = async (req, res) => {
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
    // const addUser = await User.create(req.body);
    // response(res, 200, true, "Register new user is successfully", addUser);
  } catch (error) {
    response(res, 500, false, error.message);
  }
};

module.exports = { register };
