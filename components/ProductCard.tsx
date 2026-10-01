type Product = { id: number; name: string; price: number };

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="mb-3 h-40 rounded bg-gray-100" />
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-3 w-full rounded bg-black py-2 text-sm text-white hover:bg-gray-800">
        Add to cart
      </button>
    </div>
  );
}