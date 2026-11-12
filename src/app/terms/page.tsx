import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms & Disclaimers",
  description: "Website terms and product/project disclaimers for GSM Solar Light.",
};

export default function TermsPage() {
  const settings = getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <h1 className="text-3xl font-extrabold text-[#0B1F3A]">
        Terms &amp; Disclaimers
      </h1>
      <p className="text-sm text-slate-500">
        {settings.companyName} — {settings.city}
      </p>

      <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          Information presented on this website is intended as an overview of
          GSM Solar Light&apos;s solar energy solutions, product categories and
          brand distribution relationships.
        </p>
        <h2 className="text-lg font-bold text-[#0B1F3A] pt-2">
          Specifications, Pricing &amp; Project Feasibility
        </h2>
        <p>
          Final technical specifications, product availability, pricing, site
          suitability and project timelines are confirmed only after direct
          consultation and formal quotation from GSM Solar Light. No savings,
          payback period, or government subsidy outcome is guaranteed on this
          website.
        </p>
        <h2 className="text-lg font-bold text-[#0B1F3A] pt-2">
          Brand Partnerships
        </h2>
        <p>
          GSM Solar Light distributes products from Mtek Power and Getsun
          Power. Any mention of UTL reflects a previous distribution partnership
          and does not imply current distributorship.
        </p>
      </div>
    </div>
  );
}

