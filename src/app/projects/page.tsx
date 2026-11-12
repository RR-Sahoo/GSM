import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/db";
import type { ProjectType } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Projects | Rooftop & Solar Installations",
  description:
    "Explore GSM Solar Light solar project capabilities up to 1 MW and experience in multiple 10 kW rooftop solar installations.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const activeType = (params.type || "") as ProjectType | "";
  const validType = ["residential", "commercial", "industrial"].includes(
    activeType
  )
    ? (activeType as ProjectType)
    : undefined;

  const projects = getProjects({ projectType: validType });

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Project Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Projects &amp; Installation Showcase
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Experience installing multiple 10 kW rooftop solar systems, with
              capability to undertake projects up to 1 MW.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2">
          {[
            { value: "", label: "All Projects" },
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
            { value: "industrial", label: "Industrial" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.value ? `/projects?type=${tab.value}` : "/projects"}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                (validType || "") === tab.value
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-600"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm flex flex-col"
              >
                <div className="aspect-[16/10] bg-[#0B1F3A] relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.isPlaceholder && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-100/95 text-amber-900 text-[11px] font-bold">
                      Sample Slot (Pending Photo)
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 uppercase">
                        {project.projectType}
                      </span>
                      {project.capacityLabel && (
                        <span className="text-slate-600">
                          {project.capacityLabel}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-[#0B1F3A]">
                      {project.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {project.location || "Mathura, Uttar Pradesh"}
                    </span>
                    <Link
                      href={`/contact?customerType=${encodeURIComponent(
                        project.projectType.charAt(0).toUpperCase() +
                          project.projectType.slice(1)
                      )}&requirement=Solar%20Installation`}
                      className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      Similar Project
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 p-5 text-xs text-slate-600">
            <strong>Publication Safeguard:</strong> Customer names, exact site
            addresses and project photographs are published only after explicit
            permission from the respective customer and GSM Solar Light.
          </div>
        </div>
      </section>
    </div>
  );
}

