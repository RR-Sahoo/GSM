import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "gsm_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "gsm-local-dev-secret-change-before-production"
  );
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass =
    process.env.ADMIN_PASSWORD || "gsm-solar-admin-change-me";
  const userMatch =
    username.length === expectedUser.length &&
    crypto.timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser));
  const passMatch =
    password.length === expectedPass.length &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expectedPass));
  return userMatch && passMatch;
}

export function createSessionToken(username: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${username}.${expiresAt}`;
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [username, expiresStr, sig] = parts;
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }
  const payload = `${username}.${expiresStr}`;
  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  if (sig.length !== expectedSig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function getSessionCookieConfig(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getClearSessionCookieConfig() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

