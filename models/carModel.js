const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Post", carSchema);
