import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

//req is request and res is response

app.get("/api", (req, res) => res.send("API is working"));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

import { sql } from "./config/db.js";

async function initDB(params) {
  try {
    // decimal below, 10 is total digits, 2 is digits after decimal point
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("Database connected and initialized");
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

//we only want to listen to app once db has been initialized
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
