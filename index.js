require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", movieRoutes);
app.use("/api", reviewRoutes);

// mongoose
//   .connect("mongodb://localhost:27017/movieReviews")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error: ", err));

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/movieReviews");
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
};

startServer();
