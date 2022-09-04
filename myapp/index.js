const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  console.log("Наше промежуточное ПО");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
