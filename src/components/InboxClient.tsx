"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { BirthdayNote } from "@/lib/config";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function InboxClient() {
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [notes, setNotes] = useState<BirthdayNote[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadNotes = useCallback(async () => {
    const res = await fetch("/api/notes");
    if (res.status === 401) {
      setAuthed(false);
      setNotes([]);
      return false;
    }
    if (!res.ok) {
      setError("Could not load notes");
      return false;
    }
    const data = (await res.json()) as { notes: BirthdayNote[] };
    setNotes(data.notes);
    setAuthed(true);
    return true;
  }, []);

  useEffect(() => {
    loadNotes().finally(() => setChecking(false));
  }, [loadNotes]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setError("Wrong passphrase");
        setLoading(false);
        return;
      }
      setPasscode("");
      await loadNotes();
    } catch {
      setError("Could not unlock inbox");
    } finally {
      setLoading(false);
    }
  }

  async function onLogout() {
    await fetch("/api/inbox", { method: "DELETE" });
    setAuthed(false);
    setNotes([]);
  }

  if (checking) {
    return (
      <div className="panel inbox-lock-panel" aria-busy="true">
        <p className="mono-label">Private</p>
        <p className="panel-copy">Checking inbox…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <form className="panel inbox-lock-panel" onSubmit={onLogin}>
        <p className="mono-label">Private</p>
        <h1 className="panel-title">Inbox</h1>
        <p className="panel-copy">
          Only you can read these notes. Enter your passphrase to unlock.
        </p>
        <label className="field">
          <span className="field-label-row">
            <span>Passphrase</span>
          </span>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            autoComplete="current-password"
            enterKeyHint="go"
            required
            placeholder="••••••••"
          />
        </label>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="form-actions">
          <button
            className="btn-primary btn-block"
            type="submit"
            disabled={loading || !passcode.trim()}
          >
            {loading ? "Unlocking…" : "Unlock inbox"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="inbox-shell">
      <header className="panel inbox-top">
        <div className="inbox-top-copy">
          <p className="mono-label">Private</p>
          <h1 className="panel-title">Birthday inbox</h1>
          <p className="panel-copy">
            {notes.length === 0
              ? "No notes yet — share your public link."
              : `${notes.length} note${notes.length === 1 ? "" : "s"} so far`}
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary inbox-lock-btn"
          onClick={onLogout}
        >
          Lock inbox
        </button>
      </header>

      <div className="notes-list" aria-live="polite">
        {notes.length === 0 ? (
          <div className="panel empty-note">
            <p className="empty-title">Waiting for the first note</p>
            <p className="panel-copy">
              When friends leave one, it shows up here — only for you.
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="panel note-card">
              <header className="note-card-head">
                <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
              </header>
              <p className="note-body">{note.message}</p>
              <footer className="note-card-foot">
                — {note.authorName || "Anonymous"}
              </footer>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
