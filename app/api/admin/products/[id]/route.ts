import { NextResponse } from "next/server";
import {
  deleteProduct,
  getEditableColumns,
  getProduct,
  parseInput,
  requireAdmin,
  updateProduct,
} from "@/lib/adminProducts";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  if (!(await getProduct(id))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const columns = await getEditableColumns();
  const parsed = parseInput(columns, body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    await updateProduct(id, parsed.values);
    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update product" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const deleted = await deleteProduct(id);
    if (!deleted)
      return NextResponse.json(
        { error: "This product is in existing orders, so it can't be deleted." },
        { status: 409 }
      );
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete product" }, { status: 500 });
  }
}