"use client";

import { useProductStore } from "@/app/Components/useProductStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function ProductPage() {
  const {
    selectedProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProductById,
    editProductById,
    deleteProduct,
  } = useProductStore();

  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  console.log("selectedProduct", selectedProduct);
  console.log(selectedProduct?.image);

  const router = useRouter();
  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      router.push(`/`);
    }
  }
  async function editProduct() {
    await editProductById(id);
    router.push(`/`);
  }
  return (
    <section className="pt-24">
      {loading ? (
        <p className="text-center opacity-80 font-medium tracking-tight">
          Product is loading. Sit tight
        </p>
      ) : (
        <section className="flex justify-center gap-4">
          {/* <div className="relative overflow-hidden rounded-lg size-64">
            <Image
              src={selectedProduct?.image}
              fill
              className="object-cover"
              alt={selectedProduct?.name}
            />
          </div> */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editProductById(id);
            }}
            className="w-3xl flex flex-col gap-2"
          >
            {/* <Link
              href={`/`}
              className="bg-gray-100 hover:bg-gray-200 duration-300 rounded-lg p-2 w-fit h-fit"
            >
              <ArrowLeft />
            </Link> */}
            <div>
              <Input
                type="text"
                placeholder="Input product name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDelete} variant={"destructive"}>
                <Trash />
              </Button>
              <Button
                disabled={!formData.name || !formData.price || !formData.image}
              >
                <Save />
              </Button>
            </div>
          </form>
        </section>
      )}
    </section>
  );
}
