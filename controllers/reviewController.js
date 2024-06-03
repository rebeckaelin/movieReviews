const Review = require("../models/Review");

module.exports = {
  getReviewsForMovie: async (req, res) => {
    try {
      const movieId = req.params.id;
      //   console.log(id);
      const reviews = await Review.find({movieId});
      console.log(reviews);
      if (reviews.length === 0) {
        return res
          .status(404)
          .json({message: "No reviews found for this movie"});
      }
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addReview: async (req, res) => {
    try {
      const newReview = new Review(req.body);
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  allReviews: async (_req, res) => {
    try {
      const reviews = await Review.find({});

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getReview: async (req, res) => {
    try {
      const id = req.params.id;
      const review = await Review.findById(id);
      if (!review) {
        return res.status(404).json({message: "Review not found."});
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateReview: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const review = await Review.findByIdAndUpdate(id, updates, {new: true});
      if (!review) {
        return res.status(404).json({message: "Review not found."});
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteReview: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedReview = await Review.findByIdAndDelete(id);
      if (!deletedReview) {
        return res.status(404).json({message: "No review found."});
      }
      res.status(200).json(deletedReview);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
