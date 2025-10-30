import express from "express";
import { getAllProducts, getSpecificProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts)
router.get("/:id", getSpecificProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router;