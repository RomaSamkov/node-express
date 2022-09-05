const express = require("express");
const router = require("./routes/router");

const app = express();
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
