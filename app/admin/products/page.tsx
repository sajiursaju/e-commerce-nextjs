import Link from "next/link";
import { redirect } from "next/navigation";
import { listProducts, requireAdmin } from "@/lib/adminProducts";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const products = await listProducts();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="mt-2 text-gray-600">
              Manage your store products.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow">
          {products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-lg font-medium text-gray-700">
                No products found
              </p>
              <p className="mt-2 text-gray-500">
                Add your first product to get started.
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-4">{product.id}</td>
                    <td className="p-4 font-medium">
                      {product.name ?? product.title ?? `Product #${product.id}`}
                    </td>
                    <td className="p-4">
                      {product.price == null ? "—" : String(product.price)}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/products/new/${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6">
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}