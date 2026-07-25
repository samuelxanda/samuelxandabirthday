import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const INBOX_COOKIE = "birthday_inbox";

/** Opaque session marker — never embed the passphrase in the cookie. */
const TOKEN_PAYLOAD = "inbox:v1";

function requirePasscode(): string {
  const value = process.env.ADMIN_PASSCODE?.trim();
  if (value) return value;

  // Never ship a guessable production fallback — env must be set on Vercel.
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("ADMIN_PASSCODE is not configured");
  }

  // Local-only convenience when .env.local is missing.
  return "local-dev-only";
}

function signingSecret(): string {
  return requirePasscode();
}

function sign(value: string): string {
  return createHmac("sha256", signingSecret()).update(value).digest("hex");
}

export function verifyPasscode(input: string): boolean {
  const expected = requirePasscode();
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createInboxToken(): string {
  return `${Buffer.from(TOKEN_PAYLOAD).toString("base64url")}.${sign(TOKEN_PAYLOAD)}`;
}

export function verifyInboxToken(token: string | undefined): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  try {
    const payload = Buffer.from(encoded, "base64url").toString("utf8");
    if (payload !== TOKEN_PAYLOAD) return false;
    const expectedSig = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isInboxAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyInboxToken(jar.get(INBOX_COOKIE)?.value);
}
