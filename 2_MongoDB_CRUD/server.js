const app = require("./app");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
