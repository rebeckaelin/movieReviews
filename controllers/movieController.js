const Movie = require("../models/Movie");
const Review = require("../models/Review");

module.exports = {
  getAverageRatings: async (_req, res) => {
    try {
      const averageRatings = await Review.aggregate([
        {
          $group: {
            _id: "$movieId",
            averageRating: {$avg: "$rating"},
            numberOfRatings: {$sum: 1},
          },
        },
        {
          $lookup: {
            from: "movies",
            localField: "_id",
            foreignField: "_id",
            as: "movieDetails",
          },
        },
        {
          $unwind: "$movieDetails",
        },
        {
          $project: {
            _id: 0,
            movieDetails: 1,
            averageRating: 1,
            numberOfRatings: 1,
          },
        },
      ]);

      res.status(200).json(averageRatings);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  addMovie: async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getMovies: async (_req, res) => {
    try {
      const allMovies = await Movie.find({});

      res.status(200).json(allMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getMovie: async (req, res) => {
    try {
      const id = req.params.id;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({message: "Movie not found."});
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateMovie: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const movie = await Movie.findByIdAndUpdate(id, updates, {new: true});
      if (!movie) {
        return res.status(404).json({message: "Movie not found."});
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if (!deletedMovie) {
        return res.status(404).json({message: "Movie not found"});
      }
      res.status(200).json({deleted: deletedMovie});
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
