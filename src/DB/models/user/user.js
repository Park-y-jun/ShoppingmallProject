const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    user_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

const User = mongoose.model("User", userSchema);

module.exports = User;
