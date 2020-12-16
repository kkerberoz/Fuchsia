const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
require("dotenv").config();

const { NODE_ENV, PORT, ATLAS_URI } = process.env;
const port = PORT || 5000;
const mongoUri = ATLAS_URI || "mongodb://localhost:27017/fuchsia";
// Set up Mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () =>
  console.log("MongoDB database connection established successfully!")
);

// Set up middleware
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser());

// API routes
app.get("/", (req, res) => {
  res.send("Hello,World this is CD");
  //console.log("Hello");
});

app.use("/api", require("../routes/authRoutes"));
app.use("/api", require("../routes/postRoutes"));

// app.use(function (req, res) {
//   res.send({ error: "Route is not found" }, 404);
// });

app.listen(port, () => {
  console.log(
    `Server started in ${NODE_ENV} mode. Server started on port ${port}`
  );
});

module.exports = app;
