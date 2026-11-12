import { ArrowRight, FileText, MessageCircle, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getBrands,
  getCategories,
  getProducts,
  getSiteSettings,
} from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products | Solar Panels, Inverters, Lithium-Ion Batteries & E-rickshaw Chargers",
  description:
    "Explore solar panels, solar inverters, solar equipment & accessories, lithium-ion batteries, E-rickshaw chargers and power products from GSM Solar Light in Mathura.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category || "";
  const activeBrand = params.brand || "";

  const settings = getSiteSettings();
  const categories = getCategories();
  const brands = getBrands();
  const products = getProducts({
    categorySlug: activeCategory || undefined,
    brandSlug: activeBrand || undefined,
  });

  const categoryMap = new Map(categories.map((c) => [c.slug, c]));
  const brandMap = new Map(brands.map((b) => [b.slug, b]));

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Product Catalogue
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Solar Equipment &amp; Power Products
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Browse our product categories including solar panels, inverters,
              equipment &amp; accessories, lithium-ion batteries, E-rickshaw
              chargers and other power products.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/products"
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                !activeCategory && !activeBrand
                  ? "bg-[#0B1F3A] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-600"
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-600"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center space-y-3">
              <p className="text-lg font-bold text-[#0B1F3A]">
                No products listed under this filter yet
              </p>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Contact GSM Solar Light directly to confirm product
                availability, models and quotations.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/products"
                  className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700"
                >
                  View All Products
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {products.map((product) => {
                const category = categoryMap.get(product.categorySlug);
                const brand = product.brandSlug
                  ? brandMap.get(product.brandSlug)
                  : undefined;

                return (
                  <article
                    key={product.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="block aspect-[16/10] bg-[#0B1F3A] overflow-hidden"
                    >
                      <img
                        src={product.imageUrl || "/images/cat-solar-panels.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform"
                      />
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          {category && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                              <Tag className="w-3 h-3" />
                              {category.name}
                            </span>
                          )}
                          {brand &&
                            brand.relationshipType === "current_distributor" && (
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                                {brand.name}
                              </span>
                            )}
                        </div>

                        <h2 className="text-xl font-bold text-[#0B1F3A]">
                          <Link
                            href={`/products/${product.slug}`}
                            className="hover:text-emerald-700 transition-colors"
                          >
                            {product.name}
                          </Link>
                        </h2>

                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          {product.shortDescription}
                        </p>

                        {product.specifications.length > 0 && (
                          <dl className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                            {product.specifications.slice(0, 3).map((spec) => (
                              <div
                                key={spec.label}
                                className="flex justify-between gap-2"
                              >
                                <dt className="text-slate-500">{spec.label}</dt>
                                <dd className="font-medium text-slate-800 text-right">
                                  {spec.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Pricing:</span>
                          <span className="font-bold text-[#0B1F3A]">
                            {settings.showProductPrices && product.priceDisplay
                              ? product.priceDisplay
                              : "Request Price / Enquire"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#0B1F3A] hover:bg-[#132d52] text-white text-xs font-semibold transition-colors"
                          >
                            View Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <a
                            href={buildWhatsAppUrl(
                              settings.whatsapp,
                              `Hello GSM Solar Light, I would like to enquire about: ${product.name}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>
                          {product.datasheetUrl && (
                            <a
                              href={product.datasheetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Download Datasheet"
                              className="inline-flex items-center justify-center p-2.5 rounded-lg border border-slate-200 hover:border-emerald-600 text-slate-700"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Product Accuracy Note */}
          <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 p-5 text-xs text-slate-600 leading-relaxed">
            <strong>Note on Product Specifications &amp; Availability:</strong>{" "}
            Exact model numbers, capacities, warranties, technical datasheets
            and pricing are confirmed directly by GSM Solar Light and managed
            through the company CMS.
          </div>
        </div>
      </section>
    </div>
  );
}

