import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) notFound();

  const product = await getProductById(productId);
  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-400">
        No image yet
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-gray-600 font-semibold mb-6">
          ${product.price}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}