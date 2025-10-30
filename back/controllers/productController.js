import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  // res.send("Get all products");
  try {
    const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
    console.log(`fetched products: ${products}`);
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, price and image url",
    });
  }
  try {
    const newProduct = await sql`
        INSERT INTO products (name, price, image)
        VALUES (${name}, ${price}, ${image})
        RETURNING *
    `;
    console.log(`Created new product: ${newProduct}`);
    res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSpecificProduct = async (req, res) => {
  //   res.send("Get specific product");
  const { id } = req.params;
  try {
    const product = await sql`
        SELECT * FROM products WHERE id = ${id}
        `;
    res.status(200).json({ success: true, data: product[0] });
  } catch (err) {
    console.error("Error fetching specific product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  //   res.send("Update product");
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const updatedProduct = await sql`
        UPDATE products
        SET name = ${name}, price = ${price}, image = ${image}
        WHERE id = ${id}
        RETURNING *
    `;
    if (updatedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  //   res.send("Delete product");
  const { id } = req.params;
  try {
    const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
    `;
    // if the product to be deleted does not exist
    if (deletedProduct.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
