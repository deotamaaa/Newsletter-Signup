const express = require("express");
const request = require("request");
const path = require("path");
const https = require("https");

const app = express();

app.use("*/css", express.static("public/css"));
app.use("*/images", express.static("public/images"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/28b6190668";

  const options = {
    method: "POST",
    auth: "deyooo:a32b26fb7f01b01cb06f83860d2202ae-us5",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("Server is running");
});

// Api key a32b26fb7f01b01cb06f83860d2202ae-us5
// 28b6190668
