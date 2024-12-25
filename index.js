require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const productRouter = require("./routes/product.routes");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(cors({ origin: "*" }));
app.use("/api/v1", productRouter);

app.use("/api/auth", authRouter);
app.use("/api/v1/protected-route", authMiddleware, (req, res) => {
  res.send("This is a protected route.");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
