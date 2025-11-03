"use client";

import { useProductStore } from "../Components/useProductStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function AddProduct() {
  const { addProduct, formData, setFormData, loading } = useProductStore();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addProduct();
  };
  return (
    <section className="pt-24 h-screen flex justify-center font-sans">
      <form className="flex flex-col gap-4 w-xl" onSubmit={handleSubmit}>
        <Link
          href={`/`}
          className="bg-gray-100 hover:bg-gray-200 duration-300 rounded-lg p-2 w-fit"
        >
          <ArrowLeft />
        </Link>
        <div>
          <Input
            type="text"
            placeholder="Input product name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="text-sm"
          />
        </div>
        <div>
          <Input
            type="number"
            placeholder="Input product price"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            min={0}
            step={0.01}
            value={formData.price}
            className="text-sm"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Input image URL"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            value={formData.image}
            className="text-sm"
          />
        </div>
        {/* <button onSubmit="/" className="font-semibold bg-green-600 py-2 px-4 rounded-full">Submit aqui</button> */}
        <Button
          className={`${loading ? "bg-gray-400" : "bg-green-800 hover:bg-green-900"} duration-150 font-medium`}
          disabled={!formData.name || !formData.price || !formData.image}
          type="submit"
        >
          {/* Submit here <Send /> */}
          {loading ? "Submitting..." : <>Submit here <Send /></>}
        </Button>
      </form>
    </section>
  );
}
