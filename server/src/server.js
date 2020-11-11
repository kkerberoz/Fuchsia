const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { NODE_ENV, PORT, ATLAS_URI } = process.env;
const port = PORT || 5000;
const mongoUri = ATLAS_URI || "mongodb://localhost:27017/fuchsia";
// Set up Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () =>
  console.log("MongoDB database connection established successfully!")
);

// Set up middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
  res.send("hello");
  console.log("Hello");
});

app.use("/api/login", require("../routes/api/login"));
app.use("/api/register", require("../routes/api/register"));
<<<<<<< HEAD
app.use("/api/postReview", require("../routes/api/postReview"));
=======
// app.use("/api/test", require("../routes/api/test"));
>>>>>>> 96f109bd7cd8258df19b80fb6b5e2ab97d079b23

app.listen(port, () => {
  console.log(
    `Server started in ${NODE_ENV} mode. Server started on port ${port}`
  );
});

module.exports = app;
