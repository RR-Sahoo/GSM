import {
  ArrowRight,
  CheckCircle2,
  Download,
  History,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getBrands, getProducts, getSiteSettings } from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Brands & Distribution Partnerships",
  description:
    "GSM Solar Light distribution partnerships: current distributor for Mtek Power and Getsun Power, plus previous distribution partnership with UTL.",
};

export default function BrandsPage() {
  const settings = getSiteSettings();
  const brands = getBrands();
  const allProducts = getProducts();

  const currentDistributors = brands.filter(
    (b) => b.relationshipType === "current_distributor"
  );
  const previousPartnerships = brands.filter(
    (b) => b.relationshipType === "previous_partnership"
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Brand Partnerships
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Brands &amp; Distribution Partnerships
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              At GSM Solar Light, we work with established brands to make a
              range of solar and power products available to our customers. Our
              distribution experience includes Mtek Power and Getsun Power, along
              with a previous distribution partnership with UTL.
            </p>
          </div>
        </div>
      </section>

      {/* Current Distributor Relationships */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Current Distributor Relationships
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
              Active Distribution Brands
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              GSM Solar Light acts as a distributor for the following brands.
              Customers, businesses and dealers can contact us for currently
              available products and specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentDistributors.map((brand) => {
              const linkedProducts = allProducts.filter(
                (p) => p.brandSlug === brand.slug
              );
              const enquiryReq =
                brand.slug === "mtek-power"
                  ? "Mtek Power"
                  : brand.slug === "getsun-power"
                    ? "Getsun Power"
                    : "Solar Product";

              return (
                <article
                  key={brand.id}
                  id={brand.slug}
                  className="scroll-mt-28 rounded-3xl border-2 border-emerald-200 bg-white p-7 sm:p-8 shadow-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                        {brand.relationshipLabel}
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        Active Relationship
                      </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <img
                        src={brand.logoUrl}
                        alt={`${brand.name} logo slot`}
                        className="w-full h-36 object-contain"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-[#0B1F3A]">
                      {brand.name}
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                      {brand.summary}
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {brand.description}
                    </p>

                    {linkedProducts.length > 0 && (
                      <div className="pt-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Associated Product Lines in Catalogue
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {linkedProducts.map((lp) => (
                            <Link
                              key={lp.id}
                              href={`/products/${lp.slug}`}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                            >
                              {lp.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {brand.note && (
                      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
                        {brand.note}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                    <Link
                      href={`/contact?requirement=${encodeURIComponent(
                        enquiryReq
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
                    >
                      Enquire About {brand.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={buildWhatsAppUrl(
                        settings.whatsapp,
                        `Hello GSM Solar Light, I would like to enquire about ${brand.name} products.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-600 text-sm font-semibold text-slate-700"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      WhatsApp
                    </a>

                    {brand.catalogueUrl && (
                      <a
                        href={brand.catalogueUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-600 text-sm font-semibold text-slate-700"
                      >
                        <Download className="w-4 h-4" />
                        Catalogue
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Previous Distribution Partnership (Visually Separated) */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold mb-3">
              <History className="w-3.5 h-3.5" />
              Historical Background
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Previous Distribution Partnership
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              The association listed below reflects prior distribution
              experience and is not presented as a current distributorship.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {previousPartnerships.map((brand) => (
              <article
                key={brand.id}
                id={brand.slug}
                className="scroll-mt-28 rounded-2xl border border-slate-300 bg-white p-7 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                <div className="md:col-span-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} previous partnership slot`}
                    className="w-full h-32 object-contain"
                  />
                </div>
                <div className="md:col-span-8 space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                    {brand.relationshipLabel}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {brand.summary}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {brand.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
