const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OptionSchema = require("./option");
const CommentSchema = require("./comment");

const ProductSchema = new Schema({
  index: {
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
  option: [OptionSchema],
  comments: [CommentSchema],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
