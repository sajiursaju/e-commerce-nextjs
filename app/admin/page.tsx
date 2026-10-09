import Link from "next/link";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Only real customer orders count; admin test orders are excluded
  const [statRows]: any = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM products) AS products,
      (SELECT COUNT(*) FROM users WHERE role <> 'admin') AS customers,
      (SELECT COUNT(*) FROM orders o JOIN users u ON u.id = o.user_id WHERE u.role <> 'admin') AS orders,
      (SELECT COALESCE(SUM(o.total), 0) FROM orders o JOIN users u ON u.id = o.user_id WHERE u.role <> 'admin') AS revenue
  `);
  const stats = statRows[0];
  const average = stats.orders > 0 ? Number(stats.revenue) / stats.orders : 0;

  const [recent]: any = await pool.query(`
    SELECT o.id, o.total, u.name AS customer_name
    FROM orders o JOIN users u ON u.id = o.user_id
    WHERE u.role <> 'admin'
    ORDER BY o.id DESC LIMIT 5
  `);

  const [top]: any = await pool.query(`
    SELECT oi.name, SUM(oi.quantity) AS sold, SUM(oi.price * oi.quantity) AS revenue
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    JOIN users u ON u.id = o.user_id
    WHERE u.role <> 'admin'
    GROUP BY oi.product_id, oi.name
    ORDER BY sold DESC LIMIT 5
  `);

  const cards = [
    { label: "Total revenue", value: `$${Number(stats.revenue).toFixed(2)}` },
    { label: "Orders", value: String(stats.orders) },
    { label: "Customers", value: String(stats.customers) },
    { label: "Products", value: String(stats.products) },
    { label: "Average order", value: `$${average.toFixed(2)}` },
  ];

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-1 text-xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm underline">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-500">No customer orders yet.</p>
          ) : (
            <ul className="divide-y text-sm">
              {recent.map((o: any) => (
                <li key={o.id} className="flex justify-between py-2">
                  <span>#{o.id} · {o.customer_name}</span>
                  <span>${Number(o.total).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="mb-3 font-semibold">Best selling products</h2>
          {top.length === 0 ? (
            <p className="text-sm text-gray-500">No sales yet.</p>
          ) : (
            <ul className="divide-y text-sm">
              {top.map((p: any, i: number) => (
                <li key={i} className="flex justify-between py-2">
                  <span>{p.name} × {p.sold}</span>
                  <span>${Number(p.revenue).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/products/new" className="rounded bg-black px-4 py-2 text-white">
          Add product
        </Link>
        <Link href="/admin/products" className="rounded border px-4 py-2">Manage products</Link>
        <Link href="/admin/orders" className="rounded border px-4 py-2">Customer orders</Link>
        <Link href="/admin/customers" className="rounded border px-4 py-2">Customers</Link>
      </div>
    </main>
  );
}