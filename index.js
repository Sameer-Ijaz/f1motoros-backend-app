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
    "mongodb+srv://sameer:sameer123@cluster0.iuaojez.mongodb.net/f1motors-backend"
  )
  .then(() => {
    console.log("Connected To Database");
  });

// Routes
const post_route = require("./routes/postRoutes");

app.use("/api", post_route);

app.listen("8000", function () {
  console.log("server is running");
});
