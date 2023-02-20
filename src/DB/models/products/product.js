const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new Schema(
  {
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
      type: Number,
      required: true,
    },
    option: {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(AutoIncrement, { inc_field: "product_id" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
