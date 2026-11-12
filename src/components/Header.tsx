"use client";

import { ChevronDown, Menu, Phone, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ProductCategory, SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface HeaderProps {
  settings: SiteSettings;
  categories: ProductCategory[];
}

export function Header({ settings, categories }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    "solutions" | "products" | null
  >(null);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const ctaLabel = settings.heroOfferFreeConsultation
    ? "Get a Free Consultation"
    : "Get a Consultation";

  const solutionLinks = [
    { href: "/solutions#residential", label: "Residential Solar" },
    { href: "/solutions#commercial", label: "Commercial Solar" },
    { href: "/solutions#industrial", label: "Industrial Solar" },
    { href: "/solutions#rooftop", label: "Rooftop Solar" },
    ...(settings.showGroundMountedSolar
      ? [{ href: "/solutions#ground-mounted", label: "Ground-Mounted Solar" }]
      : []),
    ...(settings.showExecutionProcess
      ? [
          {
            href: "/solutions#execution-process",
            label: "Project Installation & Execution",
          },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top utility strip */}
      <div className="bg-[#0B1F3A] text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="font-medium text-emerald-300">
              {settings.city}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Solar Projects up to 1 MW • Solar Equipment &amp; Power Solutions
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={buildWhatsAppUrl(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-medium"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] py-3 gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center shadow-sm border border-emerald-500/30">
              <Sun className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-[#0B1F3A] leading-none">
                {settings.companyName}
              </span>
              <span className="block text-[11px] font-medium text-emerald-700 mt-0.5">
                Solar &amp; Power Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1"
          >
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            {/* Solar Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("solutions")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/solutions"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/solutions")
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
                }`}
              >
                Solar Solutions
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              {openDropdown === "solutions" && (
                <div className="absolute left-0 top-full pt-1 w-64">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                    {solutionLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("products")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/products"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/products")
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
                }`}
              >
                Products
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              {openDropdown === "products" && (
                <div className="absolute left-0 top-full pt-1 w-72">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2">
                    <Link
                      href="/products"
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm font-semibold text-[#0B1F3A] hover:bg-emerald-50"
                    >
                      All Product Categories
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Required Top-Level Navigation Item */}
            <Link
              href="/brands"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive("/brands")
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
              }`}
            >
              Our Brands &amp; Partnerships
            </Link>

            <Link
              href="/projects"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/projects")
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
              }`}
            >
              Our Projects
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-50"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors whitespace-nowrap"
            >
              {ctaLabel}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/solutions", label: "Solar Solutions" },
              { href: "/products", label: "Products" },
              {
                href: "/brands",
                label: "Our Brands & Distribution Partnerships",
              },
              { href: "/projects", label: "Our Projects" },
              { href: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-3 rounded-lg bg-emerald-600 text-white font-semibold"
              >
                {ctaLabel}
              </Link>
              <a
                href={buildWhatsAppUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-4 py-2.5 rounded-lg border border-emerald-600 text-emerald-700 font-semibold"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
