const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const movieController = require("../controllers/movieController");
const reviewController = require("../controllers/reviewController");

router.post(
  "/movies",
  verifyToken,
  verifyRole("admin"),
  movieController.addMovie
);
router.get("/movies", verifyToken, movieController.getMovies);
router.get("/movies/ratings", verifyToken, movieController.getAverageRatings);
router.get("/movies/:id", verifyToken, movieController.getMovie);
router.put(
  "/movies/:id",
  verifyToken,
  verifyRole("admin"),
  movieController.updateMovie
);
router.delete(
  "/movies/:id",
  verifyToken,
  verifyRole("admin"),
  movieController.deleteMovie
);
router.get(
  "/movies/:id/reviews",
  verifyToken,
  reviewController.getReviewsForMovie
);

module.exports = router;
