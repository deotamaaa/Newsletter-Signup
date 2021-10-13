const express = require("express");
const request = require("request");
const path = require("path");

const app = express();

app.use("*/css", express.static("public/css"));
app.use("*/images", express.static("public/images"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function () {
  console.log("Server is running");
});
