const express = require("express");
const app = express();
const cors = require("cors");

// allow any origin to connect
app.use(
  cors({
    origin: "*",
  })
);

const moongose = require("mongoose");

moongose
  .connect(
    "mongodb+srv://sameer:sameer123@f1rstmotors.phuvg6d.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected To Database");
  });

// Routes
const car_route = require("./routes/carRoutes");

app.use("/api", car_route);

app.listen("8000", function () {
  console.log("server is running");
});
