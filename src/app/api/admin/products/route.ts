import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteProduct, getProducts, upsertProduct } from "@/lib/db";
import { slugify } from "@/lib/whatsapp";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ products: getProducts({ includeInactive: true }) });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "Product name is required." }, { status: 400 });
    }
    const slug = slugify(String(body.slug || name)) || `product-${Date.now()}`;
    const saved = upsertProduct({
      id: body.id ? Number(body.id) : undefined,
      slug,
      name,
      categorySlug: String(body.categorySlug || "solar-panels"),
      brandSlug: body.brandSlug ? String(body.brandSlug) : null,
      shortDescription: String(body.shortDescription || ""),
      detailedDescription: String(body.detailedDescription || ""),
      specifications: Array.isArray(body.specifications) ? body.specifications : [],
      applications: String(body.applications || ""),
      priceDisplay: String(body.priceDisplay || ""),
      imageUrl: String(body.imageUrl || "/images/cat-solar-panels.svg"),
      datasheetUrl: String(body.datasheetUrl || ""),
      isFeatured: Boolean(body.isFeatured),
      isActive: body.isActive !== false,
      sortOrder: Number(body.sortOrder || 0),
    });
    return NextResponse.json({ product: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save product" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "Missing product id" }, { status: 400 });
  }
  return NextResponse.json({ success: deleteProduct(id) });
}

