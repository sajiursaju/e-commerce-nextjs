import ProductForm from "./ProductForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getEditableColumns, requireAdmin } from "@/lib/adminProducts";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const columns = await getEditableColumns();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Product
          </h1>

          <Link
            href="/admin/products"
            className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
          >
            Back to Products
          </Link>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <ProductForm columns={columns} />
        </div>
      </div>
    </main>
  );
}