import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getBrands, updateBrand } from "@/lib/db";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ brands: getBrands(true) });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "Missing brand id" }, { status: 400 });
  }
  const updated = updateBrand(id, {
    name: body.name,
    relationshipType: body.relationshipType,
    relationshipLabel: body.relationshipLabel,
    summary: body.summary,
    description: body.description,
    logoUrl: body.logoUrl,
    catalogueUrl: body.catalogueUrl,
    note: body.note,
    isActive: body.isActive,
    sortOrder: body.sortOrder,
  });
  return NextResponse.json({ brand: updated });
}

