const midtrans = require("midtrans-client");
require("dotenv").config();

const snap = new midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

module.exports = snap;
