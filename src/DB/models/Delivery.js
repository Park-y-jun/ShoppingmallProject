const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const deliverySchema = new Schema(
  {
    index: Number,
    address: {
      type: String,
    },
    demand: {
      type: String,
    },
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

deliverySchema.plugin(autoIncrement.plugin, {
  model: "Delivery",
  field: "index",
  startAt: 1,
  increment: 1,
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
