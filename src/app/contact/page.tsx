import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getSiteSettings } from "@/lib/db";
import type { CustomerType, EnquiryRequirement } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | Request a Quote or Consultation",
  description:
    "Contact GSM Solar Light in Mathura, Uttar Pradesh for residential, commercial and industrial solar installations, solar equipment, lithium-ion batteries, E-rickshaw chargers and dealer enquiries.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    customerType?: string;
    requirement?: string;
    product?: string;
  }>;
}) {
  const params = await searchParams;
  const settings = getSiteSettings();

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Contact &amp; Enquiries
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get in Touch With GSM Solar Light
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Submit a residential, commercial, industrial, or dealer enquiry
              below. Enquiries are routed by customer type and requirement for
              timely follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-sm">
                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Company Contact Details
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0B1F3A]">Location</p>
                      <p className="text-slate-600 mt-0.5">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0B1F3A]">Phone</p>
                      <a
                        href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                        className="text-emerald-700 font-medium hover:underline mt-0.5 inline-block"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0B1F3A]">Email</p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-emerald-700 font-medium hover:underline mt-0.5 inline-block break-all"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-semibold hover:bg-[#132d52]"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href={buildWhatsAppUrl(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="font-bold text-[#0B1F3A] text-sm">
                  Mathura, Uttar Pradesh Map Reference
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exact street-level Google Business Profile pin will be linked
                  once confirmed by GSM Solar Light.
                </p>
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Open Mathura Location in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lead-Routed Enquiry Form */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">
                Send a Project or Product Enquiry
              </h2>
              <EnquiryForm
                sourcePage="/contact"
                defaultCustomerType={
                  (params.customerType as CustomerType) || "Residential"
                }
                defaultRequirement={
                  (params.requirement as EnquiryRequirement) ||
                  "Solar Installation"
                }
                productName={params.product || ""}
                whatsappNumber={settings.whatsapp}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

