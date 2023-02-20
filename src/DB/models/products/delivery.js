const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  demand: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Preparing", "In Transit", "Delivered"],
    default: "Preparing",
  },
  deliveryTime: {
    type: Date,
  },
});

const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;
