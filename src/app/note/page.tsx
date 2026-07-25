import Link from "next/link";
import { NoteForm } from "@/components/NoteForm";
import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import { SITE } from "@/lib/config";

export default function NotePage() {
  return (
    <main className="stage note-stage">
      <BirthdayBackdrop fixed className="stage-backdrop" />
      <div className="stage-glow" aria-hidden />
      <div className="stage-shell">
        <Link href="/" className="stage-back">
          ← Birthday page
        </Link>

        <header className="stage-header">
          <p className="mono-label">
            {SITE.name}&apos;s birthday · private note
          </p>
          <h1 className="stage-title">Leave {SITE.name} a private note</h1>
          <p className="stage-lede">
            A birthday wish, honest advice, something he could change, or a
            truth you wish he knew — only {SITE.name} can read it.
          </p>
        </header>

        <NoteForm />
      </div>
    </main>
  );
}
