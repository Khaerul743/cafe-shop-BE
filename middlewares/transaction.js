const sequelize = require("../config/dbConnention");

const transaction = async (req, res, next) => {
  const t = await sequelize.transaction();
  req.transaction = t;
  try {
    await next();
    // await t.commit();
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = { transaction };
