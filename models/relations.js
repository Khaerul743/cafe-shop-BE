const { Order } = require("./orders");
const { User } = require("./users");
const { Payment } = require("./payments");
const { OrderItem } = require("./orderItems");
const { Product } = require("./products");

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Order.hasOne(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

module.exports = { User, Order, OrderItem, Product, Payment };
