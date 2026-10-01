import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export async function getProducts(): Promise<Product[]> {
  const [rows] = await pool.query<(Product & RowDataPacket)[]>(
    "SELECT id, name, price FROM products ORDER BY id"
  );
  return rows;
}