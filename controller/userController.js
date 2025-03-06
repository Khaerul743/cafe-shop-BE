const { User } = require("../models/relations");
const { response } = require("../utils/response");

const getAllUser = async (req, res) => {
  try {
    const getUsers = await User.findAll();
    response(res, 200, true, "Get all user", getUsers);
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) return response(res, 404, false, "User not found");

    const { username, email, role } = user;
    response(res, 200, true, "Get user by id", { username, email, role });
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const updateUserRole = async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  try {
    const userExist = await User.findByPk(id);
    if (!userExist) return response(res, 404, false, "User not found");

    const updateUser = await User.update(
      {
        role,
      },
      {
        where: { id },
      }
    );

    response(res, 200, true, "Update user", { row: updateUser });
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userExist = await User.findByPk(id);
    if (!userExist) return response(res, 404, false, "User not found");

    const deleteUser = await User.destroy({ where: { id } });
    if (!deleteUser) return response(res, 400, false, "Invalid to delete user");
    response(res, 200, true, "delete user is successfully", {
      row: deleteUser,
    });
  } catch (error) {
    response(res, 500, false, error.message);
    console.log(error);
  }
};

module.exports = { getAllUser, getUserById, updateUserRole, deleteUser };
