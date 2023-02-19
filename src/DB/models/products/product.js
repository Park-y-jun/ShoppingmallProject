const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Option",
    required: true,
  },
  option: [option],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
