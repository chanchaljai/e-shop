import product from "../models/product.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const Product = await product.create(req.body);
        res.json({
            message: "Product created successfully",
            Product,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            message: "Product updated successfully",
            updated,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndDelete(req.params.id);
        res.json({
            message: "Product deleted successfully",
            
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};