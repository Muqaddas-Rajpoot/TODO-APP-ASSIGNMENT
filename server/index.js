const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes=require("./routes/todo.routes")

const app = express();
require("./model/db.model")();
app.use(express.json());

app.use(
  cors({
    cors: "*"
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api",todoRoutes)

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
