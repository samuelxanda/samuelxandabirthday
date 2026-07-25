import { NextResponse } from "next/server";
import {
  INBOX_COOKIE,
  createInboxToken,
  verifyPasscode,
} from "@/lib/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const passcode =
    body && typeof body === "object" && "passcode" in body
      ? (body as { passcode?: unknown }).passcode
      : undefined;

  if (typeof passcode !== "string") {
    return NextResponse.json({ error: "Wrong passphrase" }, { status: 401 });
  }

  try {
    if (!verifyPasscode(passcode)) {
      return NextResponse.json({ error: "Wrong passphrase" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Inbox unavailable" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(INBOX_COOKIE, createInboxToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(INBOX_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
