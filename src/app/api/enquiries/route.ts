import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createEnquiry, getEnquiries, updateEnquiryStatus } from "@/lib/db";
import type { CustomerType, EnquiryRequirement } from "@/lib/types";

const rateWindow = new Map<string, { count: number; resetAt: number }>();

const VALID_CUSTOMER_TYPES: CustomerType[] = [
  "Residential",
  "Commercial",
  "Industrial",
  "Dealer",
  "Business / Project Partner",
  "Other",
];

const VALID_REQUIREMENTS: EnquiryRequirement[] = [
  "Solar Installation",
  "Solar Product",
  "Lithium-Ion Battery",
  "E-rickshaw Charger",
  "Mtek Power",
  "Getsun Power",
  "Other",
];

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const bucket = rateWindow.get(ip);
    if (bucket && bucket.resetAt > now) {
      if (bucket.count >= 8) {
        return NextResponse.json(
          { error: "Too many enquiry attempts. Please try again shortly." },
          { status: 429 }
        );
      }
      bucket.count += 1;
    } else {
      rateWindow.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    const body = await req.json();

    // Honeypot spam protection
    if (typeof body.websiteUrl === "string" && body.websiteUrl.trim() !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = String(body.name || "").trim();
    const mobile = String(body.mobile || "").trim();
    const email = String(body.email || "").trim();
    const customerType = String(body.customerType || "Residential") as CustomerType;
    const requirement = String(
      body.requirement || "Solar Installation"
    ) as EnquiryRequirement;
    const projectCapacity = String(body.projectCapacity || "").trim();
    const city = String(body.city || "").trim();
    const message = String(body.message || "").trim();
    const sourcePage = String(body.sourcePage || "/").slice(0, 200);
    const productName = String(body.productName || "").slice(0, 200);
    const consentAccepted = Boolean(body.consentAccepted);

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { error: "Please enter your valid full name." },
        { status: 400 }
      );
    }

    const digits = mobile.replace(/[^\d]/g, "");
    if (digits.length < 10 || digits.length > 15) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address or leave it blank." },
        { status: 400 }
      );
    }

    if (!VALID_CUSTOMER_TYPES.includes(customerType)) {
      return NextResponse.json(
        { error: "Invalid customer type selected." },
        { status: 400 }
      );
    }

    if (!VALID_REQUIREMENTS.includes(requirement)) {
      return NextResponse.json(
        { error: "Invalid requirement selected." },
        { status: 400 }
      );
    }

    if (!consentAccepted) {
      return NextResponse.json(
        { error: "Please accept the privacy notice to submit your enquiry." },
        { status: 400 }
      );
    }

    const created = createEnquiry({
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
    });

    return NextResponse.json(
      {
        success: true,
        enquiryId: created.id,
        message:
          "Thank you. Your enquiry has been recorded and routed to the GSM Solar Light team.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process your enquiry right now. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ enquiries: getEnquiries() });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const id = Number(body.id);
  const status = String(body.status || "");
  if (!id || !["new", "contacted", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const ok = updateEnquiryStatus(id, status as "new" | "contacted" | "closed");
  return NextResponse.json({ success: ok });
}

