"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-4 text-2xl font-bold">Your cart</h1>
        <p className="mb-4 text-gray-600">Your cart is empty.</p>
        <Link href="/" className="underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

      <ul className="divide-y rounded-lg border">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-4">
            <div>
              <Link
                href={`/products/${item.id}`}
                className="font-medium hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-gray-600">${item.price} each</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded border">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="w-20 text-right font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button className="rounded bg-black px-6 py-3 text-white hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
}