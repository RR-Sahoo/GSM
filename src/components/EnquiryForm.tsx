"use client";

import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { CustomerType, EnquiryRequirement } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface EnquiryFormProps {
  sourcePage: string;
  defaultCustomerType?: CustomerType;
  defaultRequirement?: EnquiryRequirement;
  productName?: string;
  whatsappNumber: string;
  compact?: boolean;
}

const CUSTOMER_TYPES: CustomerType[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Dealer",
  "Business / Project Partner",
  "Other",
];

const REQUIREMENTS: EnquiryRequirement[] = [
  "Solar Installation",
  "Solar Product",
  "Lithium-Ion Battery",
  "E-rickshaw Charger",
  "Mtek Power",
  "Getsun Power",
  "Other",
];

export function EnquiryForm({
  sourcePage,
  defaultCustomerType = "Residential",
  defaultRequirement = "Solar Installation",
  productName = "",
  whatsappNumber,
  compact = false,
}: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [customerType, setCustomerType] =
    useState<CustomerType>(defaultCustomerType);
  const [requirement, setRequirement] =
    useState<EnquiryRequirement>(defaultRequirement);
  const [projectCapacity, setProjectCapacity] = useState("");
  const [city, setCity] = useState("Mathura");
  const [message, setMessage] = useState(
    productName ? `I would like more details and pricing for: ${productName}.` : ""
  );
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          email,
          customerType,
          requirement,
          projectCapacity,
          city,
          message,
          sourcePage,
          productName,
          consentAccepted,
          websiteUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit your enquiry.");
      } else {
        setSuccessMsg(
          data.message ||
            "Thank you! Your enquiry has been submitted to GSM Solar Light."
        );
        setName("");
        setMobile("");
        setEmail("");
        setProjectCapacity("");
        setMessage("");
      }
    } catch {
      setError("Network error while submitting your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5"
    >
      {productName && (
        <div className="px-3.5 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
          Enquiring about: <span className="font-semibold">{productName}</span>
        </div>
      )}

      {/* Honeypot field hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteUrl">Website</label>
        <input
          id="websiteUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="enquiry-name"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="enquiry-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-mobile"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Mobile Number <span className="text-red-600">*</span>
          </label>
          <input
            id="enquiry-mobile"
            type="tel"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-city"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            City / Location
          </label>
          <input
            id="enquiry-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Mathura, Uttar Pradesh"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-customer-type"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Customer Type <span className="text-red-600">*</span>
          </label>
          <select
            id="enquiry-customer-type"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value as CustomerType)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          >
            {CUSTOMER_TYPES.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enquiry-requirement"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Requirement <span className="text-red-600">*</span>
          </label>
          <select
            id="enquiry-requirement"
            value={requirement}
            onChange={(e) =>
              setRequirement(e.target.value as EnquiryRequirement)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          >
            {REQUIREMENTS.map((reqOption) => (
              <option key={reqOption} value={reqOption}>
                {reqOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label
            htmlFor="enquiry-capacity"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Estimated System Capacity / Quantity{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="enquiry-capacity"
            type="text"
            value={projectCapacity}
            onChange={(e) => setProjectCapacity(e.target.value)}
            placeholder="e.g., 10 kW rooftop, 250 kW industrial, or bulk dealer order"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="enquiry-message"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Message / Project Details
        </label>
        <textarea
          id="enquiry-message"
          rows={compact ? 3 : 4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your solar project, product or dealer requirement..."
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={consentAccepted}
          onChange={(e) => setConsentAccepted(e.target.checked)}
          required
          className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
        />
        <span>
          I agree to allow GSM Solar Light to contact me regarding this enquiry
          in accordance with the{" "}
          <Link href="/privacy" className="text-emerald-700 underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{successMsg}</p>
            <a
              href={buildWhatsAppUrl(
                whatsappNumber,
                `Hello GSM Solar Light, I just submitted an enquiry on the website (${customerType} - ${requirement}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-700 hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              Also connect immediately on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Request a Quote
            </>
          )}
        </button>

        <a
          href={buildWhatsAppUrl(
            whatsappNumber,
            productName
              ? `Hello GSM Solar Light, I would like to enquire about ${productName}.`
              : `Hello GSM Solar Light, I have a ${customerType} enquiry regarding ${requirement}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 text-sm font-semibold transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          Enquire on WhatsApp
        </a>
      </div>
    </form>
  );
}

