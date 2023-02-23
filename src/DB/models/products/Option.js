const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
