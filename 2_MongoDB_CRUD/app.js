const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const User = require("./models/userModel");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/allUsers", async (req, res) => {
  const users = await User.find({});
  res.render("readUser", { users });
});
app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/allUsers");
});
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.render("editUser", { user });
});
app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, imageUrl } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email, imageUrl },
    { new: true }
  );
  res.redirect("/allUsers");
});
app.post("/create", async (req, res) => {
  const { name, email, imageUrl } = req.body;
  const user = await User.create({ name, email, imageUrl });
  res.redirect("/allUsers");
});

module.exports = app;
