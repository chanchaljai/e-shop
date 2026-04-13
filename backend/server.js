import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cart.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
    res.send("API is running...");
});


connectDB();

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
