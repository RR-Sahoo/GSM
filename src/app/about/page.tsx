import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  MapPin,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GSM Solar Light in Mathura, Uttar Pradesh — solar projects up to 1 MW, multiple 10 kW rooftop solar installations, solar equipment, lithium-ion batteries, E-rickshaw chargers and brand distribution.",
};

export default function AboutPage() {
  const settings = getSiteSettings();

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              About GSM Solar Light
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Solar Energy &amp; Power Solutions Based in Mathura, Uttar Pradesh
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {settings.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                Who We Are
              </h2>
              <p className="text-slate-600 leading-relaxed">
                GSM Solar Light is a solar energy and power solutions company
                based in Mathura, Uttar Pradesh. The company serves residential,
                commercial and industrial customers with solar project solutions
                and a range of energy and power products.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Its business includes rooftop and other solar installations,
                solar panels and equipment, lithium-ion batteries, E-rickshaw
                chargers and selected power products. GSM Solar Light is a
                distributor of Mtek Power and Getsun Power products and has also
                had a previous distribution partnership with UTL.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Project Capability
                  </p>
                  <p className="text-xl font-bold text-[#0B1F3A] mt-1">
                    Up to 1 MW
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Solar project capability across commercial and industrial
                    requirements.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Installation Experience
                  </p>
                  <p className="text-xl font-bold text-[#0B1F3A] mt-1">
                    Multiple 10 kW Rooftops
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Practical hands-on experience executing 10 kW rooftop solar
                    systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <Compass className="w-6 h-6 text-emerald-700" />
                  <h3 className="text-lg font-bold text-[#0B1F3A]">
                    Our Vision
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To contribute to a sustainable energy future by making
                  reliable and efficient energy solutions more accessible.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#0B1F3A] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-bold">Our Mission</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To provide quality energy products and dependable solar
                  solutions, build lasting customer relationships and support
                  wider adoption of renewable energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              Core Business Verticals
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              More than an installation contractor — GSM Solar Light spans
              project delivery, equipment supply and brand distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Solar Projects",
                body: "Residential, commercial and industrial solar installations with capability up to 1 MW.",
              },
              {
                title: "Solar Equipment",
                body: "Solar panels, solar inverters, mounting and balance-of-system accessories.",
              },
              {
                title: "Batteries & Chargers",
                body: "Lithium-ion batteries, E-rickshaw chargers and wider power products.",
              },
              {
                title: "Brand Distribution",
                body: "Active distribution relationships with Mtek Power and Getsun Power.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-3" />
                <h3 className="font-bold text-[#0B1F3A]">{v.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <MapPin className="w-4 h-4" />
                Our Location
              </div>
              <h2 className="text-2xl font-bold text-[#0B1F3A]">
                {settings.city}
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                {settings.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:border-emerald-600 text-slate-800 text-sm font-semibold"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                Our Brand Partnerships
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
