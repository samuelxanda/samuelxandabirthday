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
          <p className="mono-label">Private · for {SITE.name}</p>
          <h1 className="stage-title">Leave {SITE.name} a note</h1>
          <p className="stage-lede">
            Only {SITE.name} can read what you write. Say what you want him to
            know.
          </p>
        </header>

        <NoteForm />
      </div>
    </main>
  );
}
