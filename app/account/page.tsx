import Link from "next/link";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [rows]: any = await pool.query(
    `SELECT name, email, phone, address, role,
            avatar IS NOT NULL AS has_avatar,
            (SELECT COUNT(*) FROM orders WHERE user_id = users.id) AS order_count
     FROM users WHERE id = ?`,
    [session.id]
  );
  const user = rows[0];
  if (!user) redirect("/login");

  const isAdmin = user.role === "admin";
  const btn = "rounded border px-4 py-2 text-center";
  const initial = String(user.name ?? "?").trim().charAt(0).toUpperCase();
  const details = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Address", user.address],
  ];

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Account</h1>

      <section className="rounded-lg border p-6">
        <div className="mb-6 flex items-center gap-4">
          {user.has_avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/api/account/avatar" alt="" className="h-24 w-24 rounded-full border object-cover" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-gray-100 text-3xl font-semibold text-gray-600">
              {initial}
            </div>
          )}
          <p className="text-lg font-semibold">{user.name}</p>
        </div>

        <h2 className="mb-2 font-semibold">Profile info</h2>
        {details.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-t py-3">
            <span className="font-medium">{label}</span>
            <span className="text-gray-600">{value || "Not set"}</span>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href="/account/edit" className="rounded bg-black px-4 py-2 text-center text-white">
          Edit profile
        </Link>
        {!isAdmin && (
          <>
            <Link href="/orders" className={btn}>Order history ({user.order_count})</Link>
            <Link href="/cart" className={btn}>My cart</Link>
          </>
        )}
      </div>
    </main>
  );
}