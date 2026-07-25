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
            {SITE.name}&apos;s birthday · private wish
          </p>
          <h1 className="stage-title">Leave {SITE.name} a birthday wish</h1>
          <p className="stage-lede">
            A private birthday note only {SITE.name} can read — say happy
            birthday, share a memory, or write the wish you&apos;d say in
            person.
          </p>
        </header>

        <NoteForm />
      </div>
    </main>
  );
}
