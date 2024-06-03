const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
