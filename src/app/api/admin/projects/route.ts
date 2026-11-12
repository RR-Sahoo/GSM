import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteProject, getProjects, upsertProject } from "@/lib/db";
import type { ProjectType } from "@/lib/types";
import { slugify } from "@/lib/whatsapp";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ projects: getProjects({ includeInactive: true }) });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }
    const slug = slugify(String(body.slug || title)) || `project-${Date.now()}`;
    const saved = upsertProject({
      id: body.id ? Number(body.id) : undefined,
      slug,
      title,
      projectType: String(body.projectType || "residential") as ProjectType,
      capacityLabel: String(body.capacityLabel || ""),
      location: String(body.location || ""),
      description: String(body.description || ""),
      imageUrl: String(body.imageUrl || "/images/project-rooftop-placeholder.svg"),
      isFeatured: Boolean(body.isFeatured),
      isPlaceholder: Boolean(body.isPlaceholder),
      isActive: body.isActive !== false,
      sortOrder: Number(body.sortOrder || 0),
    });
    return NextResponse.json({ project: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save project" },
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
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }
  return NextResponse.json({ success: deleteProject(id) });
}

