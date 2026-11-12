import {
  ArrowRight,
  Award,
  BatteryCharging,
  Building2,
  CheckCircle2,
  Factory,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  getBrands,
  getCategories,
  getProjects,
  getSiteSettings,
} from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GSM Solar Light | Solar Company & Power Solutions in Mathura",
  description:
    "GSM Solar Light is a solar energy and power solutions company in Mathura, Uttar Pradesh. Solar projects up to 1 MW, multiple 10 kW rooftop installations, solar equipment, lithium-ion batteries, E-rickshaw chargers, Mtek Power and Getsun Power.",
};

const HOME_FAQS = [
  {
    question: "What services does GSM Solar Light provide?",
    answer:
      "GSM Solar Light provides solar energy solutions, solar equipment and a range of power products. The company serves residential, commercial and industrial customers, as well as dealers and distribution enquiries.",
  },
  {
    question: "What size solar projects can GSM Solar Light undertake?",
    answer:
      "GSM Solar Light has the capability to undertake solar projects of up to 1 MW. Project suitability and scope are confirmed after discussing the site and requirements.",
  },
  {
    question: "Does GSM Solar Light install rooftop solar systems?",
    answer:
      "Yes. The company has experience installing multiple 10 kW rooftop solar systems. Customers can contact the team to discuss their requirements.",
  },
  {
    question: "Does GSM Solar Light distribute Mtek Power and Getsun Power products?",
    answer:
      "GSM Solar Light identifies Mtek Power and Getsun Power as its distributor brands. Customers and dealers can enquire about available products.",
  },
  {
    question: "Is GSM Solar Light associated with UTL?",
    answer:
      "GSM Solar Light has had a previous distribution partnership with UTL. This is presented strictly as historical experience rather than a current distributorship.",
  },
];

export default function HomePage() {
  const settings = getSiteSettings();
  const categories = getCategories();
  const brands = getBrands();
  const featuredProjects = getProjects({ featuredOnly: true }).slice(0, 3);

  const currentDistributors = brands.filter(
    (b) => b.relationshipType === "current_distributor"
  );
  const previousPartnerships = brands.filter(
    (b) => b.relationshipType === "previous_partnership"
  );

  const primaryCtaLabel = settings.heroOfferFreeConsultation
    ? "Get a Free Consultation"
    : "Get a Consultation";

  return (
    <div>
      {/* 4.2 Hero Banner */}
      <section className="relative bg-[#0B1F3A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide">
                <MapPin className="w-3.5 h-3.5" />
                Based in {settings.city}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
                Powering Your Future with Smarter Energy Solutions.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Your partner for solar energy systems, power equipment,
                lithium-ion batteries and reliable energy solutions. Serving
                residential, commercial, industrial and dealer customers.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/30 transition-colors"
                >
                  {primaryCtaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-500 hover:border-emerald-400 text-white font-semibold text-sm sm:text-base transition-colors"
                >
                  Explore Our Solutions
                </Link>
              </div>

              <p className="text-xs text-slate-400 pt-1">
                {settings.tagline} • Solar projects up to 1 MW • Mtek Power &amp;
                Getsun Power distributor
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#09182E]">
                <img
                  src="/images/hero-solar.svg"
                  alt="Solar panel rooftop installation illustration for GSM Solar Light"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.4 Business Highlights / Capability Strip */}
      <section className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                <Zap className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Up to 1 MW Solar Project Capability
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Structured execution for residential, commercial &amp;
                  industrial sites
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                <Home className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Multiple 10 kW Rooftop Installations
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Proven practical rooftop solar installation experience
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                <BatteryCharging className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Complete Power Product Range
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Solar equipment, lithium-ion batteries &amp; E-rickshaw
                  chargers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                <Award className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base">
                  Brand Distribution Network
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Distributor for Mtek Power &amp; Getsun Power
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.3 Short Company Introduction */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                About GSM Solar Light
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                A Complete Solar Energy &amp; Power Solutions Partner in Mathura
              </h2>
              <p className="text-slate-600 leading-relaxed">
                GSM Solar Light provides solar energy systems, solar equipment
                and a range of power solutions for residential, commercial and
                industrial customers. Based in Mathura, Uttar Pradesh, the
                company can undertake solar projects of up to 1 MW and has
                experience installing multiple 10 kW rooftop solar systems.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Beyond solar installations, our product portfolio includes solar
                panels and equipment, lithium-ion batteries, E-rickshaw chargers
                and products from our distribution partner brands.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Learn more about our company
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                {
                  title: "Residential",
                  desc: "Home rooftop solar, panels, inverters & batteries",
                },
                {
                  title: "Commercial",
                  desc: "Shops, offices, clinics & institutional systems",
                },
                {
                  title: "Industrial",
                  desc: "Larger solar project capability up to 1 MW",
                },
                {
                  title: "Dealers & Partners",
                  desc: "Product supply & distribution enquiries",
                },
              ].map((seg) => (
                <div
                  key={seg.title}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <h3 className="font-bold text-[#0B1F3A] text-sm">
                    {seg.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {seg.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Solar Solutions */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Solar Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
                Tailored Solar Systems for Every Scale
              </h2>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View all solar solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "residential",
                icon: Home,
                badge: "For Homes",
                title: "Residential Solar",
                desc: "Home rooftop solar solutions supported by practical experience in multiple 10 kW rooftop installations, panels, inverters and batteries.",
                cta: "Request a Home Consultation",
              },
              {
                id: "commercial",
                icon: Building2,
                badge: "For Businesses",
                title: "Commercial Solar",
                desc: "Solar energy systems and power backup equipment designed for shops, offices, showrooms, schools and commercial buildings.",
                cta: "Submit Commercial Enquiry",
              },
              {
                id: "industrial",
                icon: Factory,
                badge: "Up to 1 MW",
                title: "Industrial Solar",
                desc: "Structured engineering discussions and execution capability for larger-scale industrial solar installations up to 1 MW.",
                cta: "Discuss an Industrial Project",
              },
            ].map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.id}
                  className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-700" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] text-xs font-semibold">
                        {sol.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A]">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <Link
                      href={`/solutions#${sol.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      {sol.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.6 Products */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Product Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
                Solar Equipment &amp; Power Products
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Explore our six core product categories. Specifications, stock
                availability and quotations are confirmed directly by our team.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Browse full catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="group rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-emerald-500/60 hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[16/10] bg-[#0B1F3A] overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      View Products
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/contact?requirement=${encodeURIComponent(
                        cat.slug === "lithium-ion-batteries"
                          ? "Lithium-Ion Battery"
                          : cat.slug === "e-rickshaw-chargers"
                            ? "E-rickshaw Charger"
                            : "Solar Product"
                      )}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.7 Brands & Distribution Partnerships */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Brand Associations
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
                Our Brands &amp; Distribution Partnerships
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                We clearly distinguish our current distributor brands from our
                previous partnership experience.
              </p>
            </div>
            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View partnership details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {currentDistributors.map((brand) => (
              <div
                key={brand.slug}
                className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Current {brand.relationshipLabel}
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-100 mb-4 bg-slate-50">
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.name} brand placeholder`}
                      className="w-full h-32 object-contain p-2"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {brand.summary}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href={`/brands#${brand.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Explore {brand.name}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}

            {previousPartnerships.map((brand) => (
              <div
                key={brand.slug}
                className="bg-slate-100/80 rounded-2xl border border-slate-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                      {brand.relationshipLabel}
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 mb-4 bg-white">
                    <img
                      src={brand.logoUrl}
                      alt={`${brand.name} historical partnership`}
                      className="w-full h-32 object-contain p-2"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {brand.summary}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <Link
                    href={`/brands#${brand.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#0B1F3A]"
                  >
                    Read historical note
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.8 Project Showcase */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Project Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
                Selected Projects &amp; Capabilities
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View Our Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
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
                      Sample Slot
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
                      <span className="uppercase text-emerald-700">
                        {project.projectType}
                      </span>
                      {project.capacityLabel && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-600">
                            {project.capacityLabel}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  {project.location && (
                    <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {project.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.9 Why Choose GSM Solar Light */}
      <section className="py-16 sm:py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Why Choose GSM Solar Light
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Grounded in Mathura, Uttar Pradesh, we combine solar project
                execution capability with dependable solar and power product
                distribution.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Solar project capability up to 1 MW",
                "Experience with multiple 10 kW rooftop installations",
                "Solar equipment and wider power product range (including lithium-ion batteries & E-rickshaw chargers)",
                "Distribution relationships with selected brands (Mtek Power & Getsun Power)",
                "Solutions tailored for residential, commercial, industrial & dealer customers",
                "Clear, transparent guidance without unsupported claims",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-100 leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-1">
              Common Questions About GSM Solar Light
            </h2>
          </div>
          <FaqAccordion items={HOME_FAQS} />
        </div>
      </section>

      {/* 4.10 Contact / Final CTA */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#11335E] text-white p-8 sm:p-12 text-center shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              {settings.city}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold">
              Looking for a Reliable Solar or Power Solution?
            </h2>
            <p className="text-slate-300 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Speak with our team for home rooftop solar, commercial or
              industrial projects up to 1 MW, lithium-ion batteries, E-rickshaw
              chargers, or dealer enquiries.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0B1F3A] hover:bg-slate-100 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                Call {settings.phone}
              </a>
              <a
                href={buildWhatsAppUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-400 hover:border-emerald-400 text-white font-semibold text-sm transition-colors"
              >
                Send an Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

