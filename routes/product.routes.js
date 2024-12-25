const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.post("/products", authMiddleware, createProduct); // create
router.get("/products", getProducts); // read all
router.get("/products/:id", getProduct); // read by id
router.put("/products/:id", authMiddleware, updateProduct); // update
router.delete("/products/:id", authMiddleware, deleteProduct); // delete

module.exports = router;
