import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },    
}, {
    timestamps: true  // createdAt and updatedAt. auto generated and updated by mongoose
});

const Product = mongoose.model("Product", productSchema);
// "Product" is the collection name. Mongoose automatically converts it to lowercase and plural - products.

export default Product;