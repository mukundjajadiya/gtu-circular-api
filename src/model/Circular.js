const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  circulars: [
    {
      link: {
        type: String,
        required: true,
        unique: true,
      },
      text: {
        unique: true,
        type: String,
        required: true,
      },
    },
  ],
});

const Circular = mongoose.model("Circular", circularSchema);

module.exports = { Circular };
