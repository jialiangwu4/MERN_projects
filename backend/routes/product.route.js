import express from "express";
import Product from "../model/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in getting products: ",error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Create a new product
router.post("/", async (req, res) => {
    const product = req.body; // user provides data, which is stored in the request body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    console.log(product);

    const newProduct = new Product(product); // create a new product

    try {
        await newProduct.save(); // save the new product to MongoDB
        return res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        console.log("Error in creating product: ",error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// Update a product 
// Put needs to provide all the fields in the request body
// Patch only needs to provide the fields that need to be updated
router.put("/", async (req, res) => {
    const { id } = req.params; // get the product id from the request params. id is the name of the parameter in the route
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the product id is valid, aka. it is present in the database
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // {new: true} returns the updated product data
        return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.log("Error in updating product: ",error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// Delete a product
router.delete("/", async (req, res) => {
    const { id } = req.params; // get the product id from the request params. id is the name of the parameter in the route

    try {   
        const deletedProduct = await Product.findByIdAndDelete(id); // find the product by id and delete it from MongoDB
        return res.status(200).json({ success: true, message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        console.log("Error in deleting product: ",error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;