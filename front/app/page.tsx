"use client";
import { useEffect } from "react";
import { useProductStore } from "./Components/useProductStore";
import { toast } from "sonner";
import ProductCard from "./Components/ProductCard";
import { Box, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  error ? toast.error("Failed to load products" + error) : null;
  return (
    <section className="font-sans text-md pt-24 h-screen px-16 flex flex-col gap-4">
      <Link
        href={`/AddProduct`}
        className="flex items-center font-semibold gap-2 bg-green-700 text-white px-4 py-2 w-fit rounded-full text-sm"
      >
        <PlusCircle />
        Add a product
      </Link>
      <div className="flex flex-col items-center justify-center w-full opacity-80">
        {products.length === 0 && !loading && (
          <>
            <Box />
            <p className="text-center">
              No products yet. Add one
            </p>
          </>
        )}
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="flex gap-4">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
