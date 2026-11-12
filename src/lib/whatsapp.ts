export function buildWhatsAppUrl(
  whatsappNumber: string,
  customMessage?: string
): string {
  const cleaned = whatsappNumber.replace(/[^\d]/g, "");
  const message =
    customMessage ||
    "Hello GSM Solar Light, I would like to enquire about your solar and power solutions.";
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

