import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/auth";

const ALLOWED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".pdf",
]);

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size must be under 5 MB." },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: "Only PNG, JPG, WEBP, SVG, or PDF files are allowed." },
      { status: 400 }
    );
  }

  const safeBase = path
    .basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const fileName = `${safeBase || "asset"}-${Date.now()}${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadsDir, fileName), buffer);
  } catch {
    return NextResponse.json(
      {
        error:
          "Local file uploads are unavailable on read-only serverless hosting. Please paste an image/PDF URL or connect cloud storage.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ url: `/uploads/${fileName}` });
}

