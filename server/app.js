//express
const express = require("express");
const app = express();

//extra packages/security packages

//db

//routers

//middleware

//routers
app.get("/", (req, res) => {
  res.send("hello world");
});

//routes

//port
const port = process.env.PORT || 4000;
//initialize server

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
