// Mongoose is a MongoDB ORM (Object Relational Mapping) library for Node.js
// It simplifies interacting with MongoDB and makes it more intuitive and easier to use
// ORMs provide a level of abstraction between the code and the database, which makes it easier to switch between databases
// Mongoose does things like:
//   - Convert between JavaScript data types and the BSON data types used in MongoDB
//   - Provide a way to define the structure of data in the database (through the use of Schemas)
//   - Provide an interface to interact with the database (CRUD - Create, Read, Update, Delete) operations

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
    timestamps: true  // createdAt and updatedAt. auto generated and updated by mongoose. this is optional
});

const Product = mongoose.model("Product", productSchema);
// "Product" is the collection name. Mongoose automatically converts it to lowercase and plural - products.

export default Product;