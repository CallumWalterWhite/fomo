import mongoose from "mongoose";

const citySchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    CityId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("city", citySchema);

export default City;
