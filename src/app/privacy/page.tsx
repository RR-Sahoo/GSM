import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy notice for enquiries submitted to GSM Solar Light.",
};

export default function PrivacyPage() {
  const settings = getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <h1 className="text-3xl font-extrabold text-[#0B1F3A]">Privacy Policy</h1>
      <p className="text-sm text-slate-500">
        {settings.companyName} — {settings.city}
      </p>

      <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>
          GSM Solar Light collects enquiry details that you voluntarily submit
          through our website forms — including your name, mobile number,
          optional email address, customer type, requirement category, city and
          enquiry message.
        </p>
        <h2 className="text-lg font-bold text-[#0B1F3A] pt-2">
          How We Use Your Information
        </h2>
        <p>
          Submitted details are used solely to review your solar project,
          product, or dealer enquiry and to contact you via phone, email, or
          WhatsApp regarding your request. We do not sell customer contact
          information to third parties.
        </p>
        <h2 className="text-lg font-bold text-[#0B1F3A] pt-2">
          Data Requests &amp; Updates
        </h2>
        <p>
          To request updates or deletion of an enquiry record, please contact{" "}
          <span className="font-semibold">{settings.email}</span> or call{" "}
          <span className="font-semibold">{settings.phone}</span>.
        </p>
      </div>
    </div>
  );
}

