const express = require('express');
const app = express();
const PORT =  process.env.PORT || 5000;
// const env = process.env.ENV || "DEVELOPMENT";
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(`/api`, require("./auth"));
app.use(`/api`, require("./routes/index"));
// if (env === "DEVELOPMENT") {
//   app.use(require("./auth"));
// } else {
// }

app.use(express.static(path.resolve(__dirname, "frontend", "docs")));

app.get("/", (req, res) => {
  // console.log(path.resolve(__dirname, "frontend", "docs"));
  res.status(200).sendFile(path.resolve(__dirname, "frontend", "docs"));
});

app.get(/.*/, (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "frontend", "docs", "index.html")
  );
});

app.listen(PORT, () => {
  console.log("Server Connected 5000");
});