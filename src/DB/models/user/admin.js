const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "seller"],
    required: true,
  },
  permissions: [
    {
      type: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
