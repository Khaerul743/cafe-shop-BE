const { Payment } = require("../models/relations");

const getProduct = async (req, res) => {
  const insert = await Payment.create({
    order_id: 1,
    payment_method: "dana",
    amount: 10,
  });

  console.log(insert);
  res.send("hello world");
};

module.exports = { getProduct };
