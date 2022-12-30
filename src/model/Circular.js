import mongoose from "mongoose";

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

export const Circular = mongoose.model("Circular", circularSchema);
