// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const UserSchema = new Schema(
//   {
//     id: {
//       // 댓글 작성 할 때 필요
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: Number,
//       required: true,
//     },
//     role: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);

// module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  id: {
    type: Number,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", userSchema);

module.exports = User;
