"use client";
import { useEffect } from "react";

export default function Page() {
  
  useEffect(() => {
    fetch("http://localhost:4000/api/products/")
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, []);

  return <div>{}</div>;
}