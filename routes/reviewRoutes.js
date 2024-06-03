const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const reviewController = require("../controllers/reviewController");

router.post("/reviews", verifyToken, reviewController.addReview);
router.get("/reviews", verifyToken, reviewController.allReviews);
router.get("/reviews/:id", verifyToken, reviewController.getReview);
router.put("/reviews/:id", verifyToken, reviewController.updateReview);
router.delete("/reviews/:id", verifyToken, reviewController.deleteReview);

module.exports = router;
