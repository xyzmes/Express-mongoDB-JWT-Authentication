const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const mongo = require("mongoose");
const dotenv = require("dotenv");

/**
 *  In the header file of the request,
 *  include Content-Type: application/json
 */

dotenv.config();

mongo.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT || "3000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3000"}`);
});
