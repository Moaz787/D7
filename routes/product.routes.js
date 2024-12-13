const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.post("/products", createProduct); // create
router.get("/products", getProducts); // read all
router.get("/products/:id", getProduct); // read by id
router.put("/products/:id", updateProduct); // update
router.delete("/products/:id", deleteProduct); // delete

module.exports = router;
