import {
  ArrowLeft,
  Download,
  MessageCircle,
  Tag,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/EnquiryForm";
import {
  getBrands,
  getCategories,
  getProductBySlug,
  getProducts,
  getSiteSettings,
} from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !product.isActive) {
    notFound();
  }

  const settings = getSiteSettings();
  const categories = getCategories();
  const brands = getBrands();
  const category = categories.find((c) => c.slug === product.categorySlug);
  const brand = product.brandSlug
    ? brands.find((b) => b.slug === product.brandSlug)
    : null;

  const related = getProducts({ categorySlug: product.categorySlug })
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const defaultRequirement =
    product.categorySlug === "lithium-ion-batteries"
      ? "Lithium-Ion Battery"
      : product.categorySlug === "e-rickshaw-chargers"
        ? "E-rickshaw Charger"
        : "Solar Product";

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Image & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-[#0B1F3A]">
              <img
                src={product.imageUrl || "/images/cat-solar-panels.svg"}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    {category.name}
                  </span>
                )}
                {brand && brand.relationshipType === "current_distributor" && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                    Brand: {brand.name} ({brand.relationshipLabel})
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                {product.name}
              </h1>

              <p className="text-slate-700 leading-relaxed">
                {product.detailedDescription || product.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                  <span className="text-slate-500">Price: </span>
                  <span className="font-bold text-[#0B1F3A]">
                    {settings.showProductPrices && product.priceDisplay
                      ? product.priceDisplay
                      : "Request Price / Enquire"}
                  </span>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    settings.whatsapp,
                    `Hello GSM Solar Light, I would like pricing and availability for ${product.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire on WhatsApp
                </a>

                {product.datasheetUrl && (
                  <a
                    href={product.datasheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-600 text-sm font-semibold text-slate-700"
                  >
                    <Download className="w-4 h-4" />
                    Download Datasheet
                  </a>
                )}
              </div>
            </div>

            {/* Specifications Table */}
            {product.specifications.length > 0 && (
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200">
                  <h2 className="font-bold text-sm text-[#0B1F3A]">
                    Product Information &amp; Specifications
                  </h2>
                </div>
                <dl className="divide-y divide-slate-100">
                  {product.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm"
                    >
                      <dt className="font-medium text-slate-500">
                        {spec.label}
                      </dt>
                      <dd className="sm:col-span-2 text-slate-800 font-medium">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                  {product.applications && (
                    <div className="px-5 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <dt className="font-medium text-slate-500">
                        Applications
                      </dt>
                      <dd className="sm:col-span-2 text-slate-800">
                        {product.applications}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>

          {/* Product Enquiry Form */}
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">
              Request Price or Product Details
            </h2>
            <EnquiryForm
              sourcePage={`/products/${product.slug}`}
              productName={product.name}
              defaultRequirement={defaultRequirement}
              whatsappNumber={settings.whatsapp}
              compact
            />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-slate-200 p-4 hover:border-emerald-600 transition-colors"
                >
                  <p className="font-bold text-[#0B1F3A]">{item.name}</p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {item.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

