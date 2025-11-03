"use client";
import { usePathname } from "next/navigation";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const onHomePage = pathname === "/";
  return (
    <div className="h-16 w-full flex px-16 items-center border-b-2 justify-between fixed z-50 bg:black/90 backdrop-blur-md">
      <div className="flex gap-2">
        <Link href={`/`} className="font-bold font-sans">Shop Chop</Link>
        <ShoppingBag />
      </div>
      <div>
        {onHomePage && (
          <div>
            <ShoppingBag />
            <div className="bg-green-800 rounded-full flex justify-center items-center absolute w-6 h-6 top-3 right-13">
              <p className="font-semibold text-white">8</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
