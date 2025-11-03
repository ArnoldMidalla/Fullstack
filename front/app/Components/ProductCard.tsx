import { Edit, FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "./useProductStore";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";

export default function ProductCard({ product }: { product: any }) {
  // const { deleteProduct } = useProductStore();
  // function deleteProduct2(){
  //   deleteProduct(product.id);
  // }
  function test() {
    redirect(`/product/${product.id}`);
  }
  console.log("product in card", product);
  return (
    <div>
      <div className="size-32 relative overflow-hidden rounded">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 duration-300 ease-out"
        />
      </div>
      <p className="text-lg font-bold">{product.name}</p>
      <p>{Number(product.price).toFixed(2)}</p>
      <Button onClick={test}>
        <FilePenLine />
      </Button>
    </div>
  );
}
