import { NextResponse } from "next/server";
import { isInboxAuthenticated } from "@/lib/auth";
import { addNote, listNotes } from "@/lib/notes-store";
import { getPostHogServer } from "@/lib/posthog-server";

/** Private notes — only Samuel's unlocked inbox can read them. */
export async function GET() {
  try {
    if (!(await isInboxAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notes = await listNotes();
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("GET /api/notes failed", error);
    return NextResponse.json(
      { error: "Could not load notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { authorName, message } = body as {
    authorName?: unknown;
    message?: unknown;
  };

  if (typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const trimmed = message.trim();
  if (trimmed.length < 2) {
    return NextResponse.json({ error: "Write a little more" }, { status: 400 });
  }
  if (trimmed.length > 2000) {
    return NextResponse.json({ error: "Keep it under 2000 characters" }, { status: 400 });
  }

  if (authorName !== undefined && authorName !== null && typeof authorName !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (typeof authorName === "string" && authorName.trim().length > 80) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }

  try {
    const note = await addNote({
      authorName: typeof authorName === "string" ? authorName : undefined,
      message: trimmed,
    });

    const posthog = getPostHogServer();
    if (posthog) {
      try {
        posthog.capture({
          distinctId:
            request.headers.get("x-forwarded-for") || "anonymous-visitor",
          event: "note_submitted",
          properties: {
            has_name: Boolean(note.authorName),
            message_length: note.message.length,
            $current_url: request.headers.get("referer") || undefined,
          },
        });
        await posthog.shutdown();
      } catch (error) {
        console.error("PostHog capture failed", error);
      }
    }

    return NextResponse.json({ ok: true, note }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notes failed", error);
    return NextResponse.json(
      { error: "Could not save your note — try again?" },
      { status: 500 },
    );
  }
}
