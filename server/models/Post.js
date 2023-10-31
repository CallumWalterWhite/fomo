import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    locationdata_id: String,
    locationName: String,
    locationCityId: Number,
    locationCity: String,
    description: String,
    locationPath: String,
    picturePath: String
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
