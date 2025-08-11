const express = require("express");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error creating task");
      }
      res.redirect("/");
    }
  );
});

app.get("/files/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, data) => {
    res.render("show", { fileName: req.params.fileName, fileContent: data });
  });
});
app.post("/edit/:fileName", (req, res) => {
  fs.rename(
    `./files/${req.params.fileName}`,
    `./files/${req.body.newFileName}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error renaming file");
      }
      res.redirect("/");
    }
  );
});
app.get("/edit/:fileName", (req, res) => {
  res.render("edit", { fileName: req.params.fileName });
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
