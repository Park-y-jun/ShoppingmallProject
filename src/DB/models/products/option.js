const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Option = mongoose.model("Option", OptionSchema);

module.exports = Option;
