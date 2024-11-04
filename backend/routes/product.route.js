// Using a separate router for products allows us to isolate the routes for this resource
// It also makes it easier to export the routes for testing and to reuse them in other parts of the application

import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Create a new product
router.post("/", createProduct);

// Update a product 
// Put needs to provide all the fields in the request body
// Patch only needs to provide the fields that need to be updated
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;