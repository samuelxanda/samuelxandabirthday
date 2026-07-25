"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SITE, type BirthdayNote } from "@/lib/config";
import { track } from "@/lib/analytics";
import { ConfettiBurst } from "./ConfettiBurst";
import { ShareMoment } from "@/components/ShareMoment";
import { GlassCard } from "@/components/ui/glass-card";

export function NoteForm() {
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [lastNote, setLastNote] = useState<BirthdayNote | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: authorName.trim() || undefined,
          message,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        note?: BirthdayNote;
      };
      if (!res.ok || !data.note) {
        setStatus("error");
        setError(data.error || "Something went wrong");
        return;
      }
      setLastNote(data.note);
      setStatus("done");
      setCelebrate(true);
      setMessage("");
      setAuthorName("");
      track("note_submitted", {
        has_name: Boolean(data.note.authorName),
        message_length: data.note.message.length,
      });
    } catch {
      setStatus("error");
      setError("Could not send — try again?");
    }
  }

  if (status === "done" && lastNote) {
    return (
      <GlassCard className="success-panel">
        <ConfettiBurst fire={celebrate} />
        <p className="success-mark" aria-hidden>
          ✦
        </p>
        <h2 className="panel-title">{SITE.thankYouTitle}</h2>
        <p className="panel-copy">{SITE.thankYou}</p>
        <ShareMoment className="success-share" />
        <div className="action-stack">
          <button
            type="button"
            className="btn-secondary btn-block"
            onClick={() => {
              setCelebrate(false);
              setLastNote(null);
              setFormKey((k) => k + 1);
              setStatus("idle");
            }}
          >
            Leave another note
          </button>
          <Link href="/" className="btn-primary btn-block">
            Back to the birthday page
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <NoteFormFields
      key={formKey}
      authorName={authorName}
      setAuthorName={setAuthorName}
      message={message}
      setMessage={setMessage}
      status={status}
      error={error}
      onSubmit={onSubmit}
    />
  );
}

type NoteFormFieldsProps = {
  authorName: string;
  setAuthorName: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  status: "idle" | "loading" | "done" | "error";
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function NoteFormFields({
  authorName,
  setAuthorName,
  message,
  setMessage,
  status,
  error,
  onSubmit,
}: NoteFormFieldsProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const remaining = 2000 - message.length;

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const units = form.querySelectorAll(".form-unit");
    const tween = gsap.fromTo(
      units,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.05,
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <GlassCard className="form-panel">
      <form ref={formRef} onSubmit={onSubmit}>
        <label className="field form-unit">
          <span className="field-label-row">
            <span>Your note</span>
            <span className={`field-meta ${remaining < 80 ? "is-warn" : ""}`}>
              {remaining}
            </span>
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            maxLength={2000}
            required
            autoComplete="off"
            enterKeyHint="done"
            placeholder={`Happy birthday… / Here’s something I’d tell you honestly… / One thing you could change… / A truth I wish you knew…`}
          />
        </label>

        <label className="field form-unit">
          <span className="field-label-row">
            <span>
              Your name <em>(optional)</em>
            </span>
          </span>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={80}
            autoComplete="nickname"
            enterKeyHint="done"
            placeholder="Anonymous is fine too"
          />
        </label>

        {error ? (
          <p className="form-error form-unit" role="alert">
            {error}
          </p>
        ) : null}

        <div className="form-actions form-unit">
          <button
            className="btn-primary btn-block"
            type="submit"
            disabled={status === "loading" || message.trim().length < 2}
          >
            {status === "loading" ? "Sending…" : "Send private note"}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
