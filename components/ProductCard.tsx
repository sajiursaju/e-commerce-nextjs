"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

type Product = { id: number; name: string; price: number };

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div className="mb-3 h-40 rounded bg-gray-100" />
        <h3 className="font-medium hover:underline">{product.name}</h3>
      </Link>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full rounded bg-black py-2 text-sm text-white hover:bg-gray-800"
      >
        Add to cart
      </button>
    </div>
  );
}