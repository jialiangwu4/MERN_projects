import express from "express";
import dotenv from "dotenv"; // load configs
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware to accept json data in the request body

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})