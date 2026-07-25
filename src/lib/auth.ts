import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const INBOX_COOKIE = "birthday_inbox";

function expectedPasscode(): string {
  return process.env.ADMIN_PASSCODE?.trim() || "samuel-bday";
}

function sign(value: string): string {
  const secret = process.env.ADMIN_PASSCODE?.trim() || "samuel-bday-dev-secret";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function verifyPasscode(input: string): boolean {
  const expected = expectedPasscode();
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createInboxToken(): string {
  const payload = `ok:${expectedPasscode()}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function verifyInboxToken(token: string | undefined): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  try {
    const payload = Buffer.from(encoded, "base64url").toString("utf8");
    const expectedSig = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    return payload === `ok:${expectedPasscode()}`;
  } catch {
    return false;
  }
}

export async function isInboxAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyInboxToken(jar.get(INBOX_COOKIE)?.value);
}
