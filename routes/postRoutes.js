const express = require("express");
const post_route = express();
const bodyParser = require("body-parser");

post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer"); // used for uploading files
const path = require("path");

post_route.use(express.static("public")); // used for making a folder visible to client side.

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(
      null,
      path.join(__dirname, "../public/postImages"),
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, sucess) {
      if (error) {
        console.log(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

post_route.post("/create-post");

module.exports = post_route;
