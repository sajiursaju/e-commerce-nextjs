"use client";

import { useCart } from "@/components/CartContext";

type Product = { id: number; name: string; price: number };

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
    >
      Add to cart
    </button>
  );
}