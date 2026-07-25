import { createAdminClient } from "@insforge/sdk";
import { randomUUID } from "crypto";
import type { BirthdayNote } from "./config";

function getAdmin() {
  const baseUrl = process.env.INSFORGE_URL?.trim();
  const apiKey = process.env.INSFORGE_API_KEY?.trim();
  if (!baseUrl || !apiKey) {
    throw new Error(
      "Notes storage is not configured. Set INSFORGE_URL and INSFORGE_API_KEY.",
    );
  }
  return createAdminClient({ baseUrl, apiKey });
}

type NoteRow = {
  id: string;
  author_name: string | null;
  category: string | null;
  know_me: string | null;
  message: string;
  created_at: string;
};

function rowToNote(row: NoteRow): BirthdayNote {
  return {
    id: row.id,
    authorName: row.author_name ?? null,
    category: row.category ?? "note",
    knowMe: row.know_me ?? null,
    message: row.message,
    createdAt: row.created_at,
  };
}

export async function listNotes(): Promise<BirthdayNote[]> {
  const admin = getAdmin();
  const { data, error } = await admin.database
    .from("birthday_notes")
    .select("id, author_name, category, know_me, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Failed to load notes");
  }

  return ((data ?? []) as NoteRow[]).map(rowToNote);
}

export async function addNote(input: {
  authorName?: string;
  message: string;
}): Promise<BirthdayNote> {
  const admin = getAdmin();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const authorName = input.authorName?.trim() ? input.authorName.trim() : null;

  const { data, error } = await admin.database
    .from("birthday_notes")
    .insert([
      {
        id,
        author_name: authorName,
        category: "note",
        know_me: null,
        message: input.message.trim(),
        created_at: createdAt,
      },
    ])
    .select("id, author_name, category, know_me, message, created_at");

  if (error) {
    throw new Error(error.message || "Failed to save note");
  }

  const row = (data?.[0] ?? null) as NoteRow | null;
  if (!row) {
    // Insert succeeded but select returned nothing — still return what we wrote.
    return {
      id,
      authorName,
      category: "note",
      knowMe: null,
      message: input.message.trim(),
      createdAt,
    };
  }

  return rowToNote(row);
}
