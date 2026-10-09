import { pool } from "@/lib/db";

export type OrderItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  total: number;
  created_at?: string | Date | null;
  items: OrderItem[];
};

export async function getOrdersForUser(userId: number): Promise<Order[]> {
  const [orders]: any = await pool.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );
  if (orders.length === 0) return [];

  const ids = orders.map((o: any) => o.id);
  const [items]: any = await pool.query(
    "SELECT order_id, product_id, name, price, quantity FROM order_items WHERE order_id IN (?)",
    [ids]
  );

  return orders.map((o: any) => ({
    id: o.id,
    total: Number(o.total),
    created_at: o.created_at ?? null,
    items: items.filter((i: any) => i.order_id === o.id),
  }));
}