import { NextResponse } from "next/server";
import { getClearSessionCookieConfig } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(getClearSessionCookieConfig());
  return res;
}

