const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: Number,
    },
    option: [
      {
        _id: { id: false },
        origin: String,
        weight: Number,
        freeze: Boolean,
        delivery_fee: Number,
      },
    ],
    product_id: Number,
  },
  { timestamps: true }
);

productSchema.plugin(autoIncrement.plugin, {
  model: "Product",
  field: "product_id",
  startAt: 1,
  increment: 1,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
