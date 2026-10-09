import { getAllOrders } from "@/lib/orders";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b font-semibold">
              <tr>
                <th className="py-2">Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Price</th>
                <th>Status</th>
                <th>Tracking number</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b align-top">
                  <td className="py-2">#{o.id}</td>
                  <td>{o.customer_name ?? "—"}</td>
                  <td>
                    {o.items.map((it, i) => (
                      <div key={i}>
                        {it.name} × {it.quantity}
                      </div>
                    ))}
                  </td>
                  <td>${o.total.toFixed(2)}</td>
                  <td>{o.status ?? "—"}</td>
                  <td>{o.tracking_number ?? "—"}</td>
                  <td>
                    {o.created_at
                      ? new Date(o.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}