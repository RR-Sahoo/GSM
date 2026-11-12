import { Mail, MapPin, Phone, Sun } from "lucide-react";
import Link from "next/link";
import type { ProductCategory, SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface FooterProps {
  settings: SiteSettings;
  categories: ProductCategory[];
}

export function Footer({ settings, categories }: FooterProps) {
  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-400/30 flex items-center justify-center">
                <Sun className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  {settings.companyName}
                </h2>
                <p className="text-xs text-emerald-300">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Solar energy systems, solar equipment, lithium-ion batteries,
              E-rickshaw chargers and wider power solutions for residential,
              commercial, industrial and dealer customers.
            </p>
            <p className="text-xs text-slate-400">
              Solar project capability up to 1 MW • Experience in multiple 10 kW
              rooftop installations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company &amp; Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-emerald-300 transition-colors">
                  Solar Solutions
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-emerald-300 transition-colors">
                  Our Brands &amp; Distribution Partnerships
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-300 transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-emerald-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact &amp; Location
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="hover:text-emerald-300"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-emerald-300 break-all"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={buildWhatsAppUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                Enquire on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-3.5 py-2 rounded-lg border border-slate-600 hover:border-emerald-400 text-slate-200 text-xs font-semibold transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. All rights
            reserved. Based in {settings.city}.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-emerald-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-300">
              Terms &amp; Disclaimers
            </Link>
            <Link href="/admin" className="hover:text-emerald-300">
              Staff CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

