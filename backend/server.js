import express from "express";
import dotenv from "dotenv"; // load configs
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json()); // middleware to accept json data in the request body

app.use("/api/products", productRoutes);

// in production mode, serve static files from the frontend/dist folder
// this is the output of the frontend build process
// path.join(__dirname, "/frontend/dist") is the full path to the dist folder
// express.static() is a middleware function that serves static files
// it's only used in production mode, since we use Vite for development

// this code will be executed in production mode
// it will serve static files from the frontend/dist folder
// deploying both backend and frontend to the same domain
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
