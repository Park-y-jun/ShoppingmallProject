const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const comentSchema = new Schema(
  {
    coment_id: Number,
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    coment: {
      type: String,
    },
    rate: { type: Number },
    date: { type: Date },
  },
  { timestamps: true }
);

comentSchema.plugin(autoIncrement.plugin, {
  model: "Coment",
  field: "coment_id",
  startAt: 1,
  increment: 1,
});
const Coment = mongoose.model("Coment", comentSchema);

module.exports = Coment;
