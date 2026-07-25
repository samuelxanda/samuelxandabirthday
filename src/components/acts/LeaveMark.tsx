"use client";

import Link from "next/link";
import { FadeContent } from "@/components/react-bits";
import { SITE } from "@/lib/config";

export function LeaveMark() {
  return (
    <section className="moment moment-mark" aria-label={`Leave ${SITE.name} a note`}>
      <FadeContent className="moment-inner">
        <p className="moment-invite">Say something.</p>
        <Link href="/note" className="btn-primary moment-cta">
          Leave {SITE.name} a note
        </Link>
      </FadeContent>
    </section>
  );
}
