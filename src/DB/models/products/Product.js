const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new Schema(
  {
    product_id: Number,

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
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
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    option: {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, { inc_field: "product_id" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
