import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  Factory,
  Home,
  Layers,
  Sun,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solar Solutions | Residential, Commercial & Industrial Solar",
  description:
    "Residential rooftop solar, commercial solar, industrial solar projects up to 1 MW and rooftop solar systems in Mathura, Uttar Pradesh by GSM Solar Light.",
};

export default function SolarSolutionsPage() {
  const settings = getSiteSettings();

  const solutions = [
    {
      id: "residential",
      icon: Home,
      title: "Residential Solar",
      whoFor: "Homeowners and residential properties in Mathura & nearby areas",
      problem:
        "Rising household electricity demand and power reliability concerns.",
      offering:
        "Consultation, site assessment and rooftop solar installation options backed by our experience installing multiple 10 kW rooftop solar systems, plus panels, inverters and batteries.",
      faqs: [
        {
          question: "How do I start a home rooftop solar enquiry?",
          answer:
            "Contact our team via the enquiry form or WhatsApp with your location and approximate roof area or electricity requirement. We will confirm the next steps for a site assessment.",
        },
        {
          question: "Can GSM Solar Light supply components as well as installation?",
          answer:
            "Yes. We provide complete rooftop solar installations as well as solar panels, inverters and battery solutions.",
        },
      ],
      ctaText: "Request a Home Solar Consultation",
      customerType: "Residential",
    },
    {
      id: "commercial",
      icon: Building2,
      title: "Commercial Solar",
      whoFor:
        "Shops, offices, showrooms, hospitals, schools and commercial buildings",
      problem:
        "Managing daytime power consumption and ensuring dependable power equipment for commercial operations.",
      offering:
        "Commercial rooftop solar installations, solar equipment and wider power solutions tailored after evaluating site roof space and load requirements.",
      faqs: [
        {
          question: "What details should commercial buyers share during an enquiry?",
          answer:
            "Share your building type, city/location, approximate connected load or desired system size so our team can prepare a relevant discussion.",
        },
      ],
      ctaText: "Submit a Commercial Project Enquiry",
      customerType: "Commercial",
    },
    {
      id: "industrial",
      icon: Factory,
      title: "Industrial Solar",
      whoFor: "Factories, warehouses, mills and large industrial facilities",
      problem:
        "Sourcing a partner capable of supporting larger-scale solar planning and equipment supply.",
      offering:
        "GSM Solar Light has the capability to undertake solar projects up to 1 MW, offering structured project discussions and industrial equipment sourcing.",
      faqs: [
        {
          question: "What is the maximum solar project capacity GSM Solar Light undertakes?",
          answer:
            "GSM Solar Light has the capability to undertake solar projects up to 1 MW. Exact scope and timeline are confirmed after site review.",
        },
      ],
      ctaText: "Discuss an Industrial Solar Project",
      customerType: "Industrial",
    },
    {
      id: "rooftop",
      icon: Sun,
      title: "Rooftop Solar",
      whoFor:
        "Residential, commercial and institutional premises with suitable roof space",
      problem:
        "Utilising available roof space effectively with properly matched solar panels, inverters and mounting structures.",
      offering:
        "Rooftop solar systems backed by hands-on experience in multiple 10 kW rooftop installations and scalable designs up to larger commercial/industrial roofs.",
      faqs: [
        {
          question: "Do you guarantee fixed payback periods or savings percentages?",
          answer:
            "No generic savings or payback figures are assumed on the website. System output and suitability depend on confirmed site conditions and load profiles.",
        },
      ],
      ctaText: "Enquire About Rooftop Solar",
      customerType: "Residential",
    },
  ];

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Solar Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Solar Energy Systems From Home Rooftops to 1 MW Projects
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Serving residential, commercial and industrial customers in{" "}
              {settings.city} with practical rooftop experience and project
              capability up to 1 MW.
            </p>
          </div>
        </div>
      </section>

      {/* Jump Navigation */}
      <section className="bg-slate-50 border-b border-slate-200 sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-600 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
            >
              {s.title}
            </a>
          ))}
          {settings.showGroundMountedSolar && (
            <a
              href="#ground-mounted"
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-600 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800"
            >
              Ground-Mounted Solar
            </a>
          )}
          {settings.showExecutionProcess && (
            <a
              href="#execution-process"
              className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-600 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800"
            >
              Project Installation &amp; Execution
            </a>
          )}
        </div>
      </section>

      {/* Solution Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {solutions.map((sol) => {
          const Icon = sol.icon;
          return (
            <section
              key={sol.id}
              id={sol.id}
              className="scroll-mt-36 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                      {sol.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Who It Is For
                      </p>
                      <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
                        {sol.whoFor}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Need Addressed
                      </p>
                      <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
                        {sol.problem}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                      What GSM Solar Light Offers
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {sol.offering}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/contact?customerType=${encodeURIComponent(
                        sol.customerType
                      )}&requirement=Solar%20Installation`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                    >
                      {sol.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-[#0B1F3A]">
                    <img
                      src={
                        sol.id === "commercial"
                          ? "/images/project-commercial-placeholder.svg"
                          : sol.id === "industrial"
                            ? "/images/project-industrial-placeholder.svg"
                            : "/images/project-rooftop-placeholder.svg"
                      }
                      alt={`${sol.title} visual`}
                      className="w-full h-auto"
                    />
                  </div>
                  <FaqAccordion items={sol.faqs} />
                </div>
              </div>
            </section>
          );
        })}

        {/* Conditional CMS-controlled section: Ground-Mounted Solar */}
        {settings.showGroundMountedSolar && (
          <section
            id="ground-mounted"
            className="scroll-mt-36 rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-700" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                Ground-Mounted Solar
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed max-w-3xl">
              Ground-mounted solar project discussions for open land and larger
              industrial sites up to 1 MW capability. Contact our team to verify
              site suitability and project requirements.
            </p>
            <div className="mt-6">
              <Link
                href="/contact?customerType=Industrial&requirement=Solar%20Installation"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
              >
                Discuss Ground-Mounted Solar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Conditional CMS-controlled section: Project Installation & Execution */}
        {settings.showExecutionProcess && (
          <section
            id="execution-process"
            className="scroll-mt-36 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                Project Installation &amp; Execution
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Requirement Discussion",
                  desc: "Understanding residential, commercial or industrial energy needs.",
                },
                {
                  step: "02",
                  title: "Site Evaluation",
                  desc: "Reviewing roof or site layout and confirming technical feasibility.",
                },
                {
                  step: "03",
                  title: "Equipment & Supply",
                  desc: "Confirming panels, inverters, batteries and project components.",
                },
                {
                  step: "04",
                  title: "Installation & Handover",
                  desc: "Execution and handover aligned with agreed project scope.",
                },
              ].map((st) => (
                <div
                  key={st.step}
                  className="bg-white rounded-xl border border-slate-200 p-5"
                >
                  <span className="text-xs font-extrabold text-emerald-700">
                    STEP {st.step}
                  </span>
                  <h3 className="font-bold text-[#0B1F3A] mt-1">{st.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
