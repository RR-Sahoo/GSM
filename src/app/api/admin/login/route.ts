import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieConfig,
  verifyCredentials,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!verifyCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = createSessionToken(username);
    const res = NextResponse.json({ success: true });
    res.cookies.set(getSessionCookieConfig(token));
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

