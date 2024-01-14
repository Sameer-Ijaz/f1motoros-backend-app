const express = require("express");
const car_route = express();
const bodyParser = require("body-parser");

car_route.use(bodyParser.json());
car_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer"); // used for uploading files
const path = require("path");

car_route.use(express.static("public")); // used for making a folder visible to client side.

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

const car_controller = require("../controllers/carController");

const upload = multer({ storage: storage });

car_route.post("/add-car", upload.single("image"), car_controller.createCar);
car_route.get("/get-cars", car_controller.getCars);
car_route.put("/update-car", upload.single("image"), car_controller.updateCars);
car_route.delete("/delete-car/:id", car_controller.deleteCars);

module.exports = car_route;
