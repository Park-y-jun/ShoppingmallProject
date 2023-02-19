const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  values: [
    {
      type: String,
    },
  ],
});

const productSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  option: [optionSchema],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

productSchema.plugin(AutoIncrement, { inc_field: "id" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
