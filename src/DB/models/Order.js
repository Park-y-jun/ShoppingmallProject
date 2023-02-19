const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
//const User = require("./User");

const orderSchema = new Schema(
  {
    order_id: Number,
    count: {
      type: Number,
    },
    total: {
      type: Number,
    },
    date: {
      type: Date,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

orderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "order_id",
  startAt: 1,
  increment: 1,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
