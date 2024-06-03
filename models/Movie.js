const mongoose = require("mongoose");
const {Schema} = mongoose;
const toTitleCase = require("../services/movieFunctions");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    set: toTitleCase,
  },
  director: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
