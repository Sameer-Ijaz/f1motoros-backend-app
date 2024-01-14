const Car = require("../models/carModel");

const createCar = async (req, res) => {
  try {
    if (req.file != undefined) {
      const car = new Car({
        companyName: req.body.companyName,
        modelName: req.body.modelName,
        year: req.body.year,
        price: req.body.price,
        image: req.file.filename,
      });
      const carData = await car.save();
      res.status(200).send({ success: true, msg: "Car Added", data: carData });
    } else {
      const car = new Car({
        companyName: req.body.companyName,
        modelName: req.body.modelName,
        year: req.body.year,
        price: req.body.price,
      });
      const carData = await car.save();
      res.status(200).send({ success: true, msg: "Car Added", data: carData });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getCars = async (req, res) => {
  try {
    const car = await Car.find({});
    res.status(200).send({ success: true, msg: "Cars", data: car });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deleteCars = async (req, res) => {
  try {
    const id = req.params.id;
    await Car.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "Car Deleted" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const updateCars = async (req, res) => {
  try {
    var id = req.body.id;
    var companyName = req.body.companyName;
    var modelName = req.body.modelName;
    var year = req.body.year;
    var price = req.body.price;

    if (req.file !== undefined) {
      var filename = req.file.filename;
      await Car.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            companyName: companyName,
            price: price,
            image: filename,
            modelName: modelName,
            year: year,
          },
        }
      );
    } else {
      await Car.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            companyName: companyName,
            price: price,
            modelName: modelName,
            year: year,
          },
        }
      );
    }

    res.status(200).send({ success: true, msg: "Car Updated" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: "Car Not Updated", error: error.message });
  }
};

module.exports = {
  createCar,
  getCars,
  deleteCars,
  updateCars,
};
