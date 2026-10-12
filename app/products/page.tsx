import Link from "next/link";
import { pool } from "@/lib/db";
import { productCategories } from "@/config/site";

export const dynamic = "force-dynamic";

const SORTS: Record<string, { label: string; sql: string }> = {
  newest: { label: "Newest", sql: "id DESC" },
  price_asc: { label: "Price: low to high", sql: "price ASC" },
  price_desc: { label: "Price: high to low", sql: "price DESC" },
  name: { label: "Name A-Z", sql: "name ASC" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; category?: string }>;
}) {
  const { q = "", sort = "newest", category = "" } = await searchParams;
  const search = q.trim().slice(0, 100);
  const order = (SORTS[sort] ?? SORTS.newest).sql; // whitelisted
  const active = productCategories.find((c) => c.value === category) ?? null; // whitelisted

  const where: string[] = [];
  const params: string[] = [];
  if (search) {
    where.push("name LIKE ?");
    params.push(`%${search}%`);
  }
  if (active) {
    where.push("category = ?");
    params.push(active.value);
  }
  const sql = `SELECT * FROM products ${
    where.length ? "WHERE " + where.join(" AND ") : ""
  } ORDER BY ${order}`;

  const [rows]: any = await pool.query(sql, params);
  const products = rows as Record<string, any>[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{active ? active.label : "All products"}</h1>

      <form method="GET" className="mb-8 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={search}
          placeholder="Search products..."
          className="min-w-[200px] flex-1 rounded border px-3 py-2"
        />
        <select name="category" defaultValue={active?.value ?? ""} className="rounded border px-3 py-2">
          <option value="">All categories</option>
          {productCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className="rounded border px-3 py-2">
          {Object.entries(SORTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </select>
        <button className="rounded bg-black px-4 py-2 text-white">Apply</button>
        {(search || active || sort !== "newest") && (
          <Link href="/products" className="px-2 py-2 underline">
            Clear
          </Link>
        )}
      </form>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => {
              const image = p.image ?? p.image_url ?? p.img ?? null;
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="block rounded-lg border p-3 transition hover:shadow-md"
                >
                  {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={p.name}
                      className="mb-3 aspect-square w-full rounded object-cover"
                    />
                  )}
                  <h2 className="font-semibold">{p.name}</h2>
                  <p className="mt-1">${Number(p.price).toFixed(2)}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}