const express = require("express");
const app = express();
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
require("./config/dbConnention");
app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
