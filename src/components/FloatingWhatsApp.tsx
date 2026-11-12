"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={buildWhatsAppUrl(
        settings.whatsapp,
        "Hello GSM Solar Light, I would like to discuss a solar or power product enquiry."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.02]"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">
        Enquire on WhatsApp
      </span>
    </a>
  );
}

