import { NextResponse } from "next/server";
import { createProduct, getEditableColumns, parseInput, requireAdmin } from "@/lib/adminProducts";

export async function POST(request: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const columns = await getEditableColumns();
  const parsed = parseInput(columns, body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const id = await createProduct(parsed.values);
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create product" }, { status: 500 });
  }
}