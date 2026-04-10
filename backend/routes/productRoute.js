import express from "express";
import {createProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

// Route for creating a new product
router.post("/add", createProduct);

// Route for getting all products
router.get("/", getAllProducts);

// Route for update a product by ID
router.put("/update/:id", updateProduct);

// Route for deleting a product by ID
router.delete("/delete/:id", deleteProduct);

export default router;