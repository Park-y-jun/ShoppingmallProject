const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    // token: {
    //   type: String,
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    user_id: Number,
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "user_id" });

const User = mongoose.model("User", userSchema);

module.exports = User;
