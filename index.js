require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
