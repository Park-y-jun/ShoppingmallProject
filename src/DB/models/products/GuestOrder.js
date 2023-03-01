const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestOrderSchema = new Schema(
  {
    guest: {
      type: Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "orderd", "shipped", "delivered"],
      default: "pending",
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const GuestOrder = mongoose.model("GuestOrder", GuestOrderSchema);

module.exports = GuestOrder;
