import { InboxClient } from "@/components/InboxClient";
import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import Link from "next/link";

export default function InboxPage() {
  return (
    <main className="stage inbox-stage">
      <BirthdayBackdrop fixed className="stage-backdrop" />
      <div className="stage-glow" aria-hidden />
      <div className="stage-shell stage-shell-wide">
        <Link href="/" className="stage-back">
          ← Birthday page
        </Link>
        <InboxClient />
      </div>
    </main>
  );
}
