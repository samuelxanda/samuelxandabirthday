"use client";

import Link from "next/link";
import { FadeContent } from "@/components/react-bits";
import { SITE } from "@/lib/config";

export function LeaveMark() {
  return (
    <section
      className="moment moment-mark"
      aria-label={`Leave ${SITE.name} a private note`}
    >
      <FadeContent className="moment-inner">
        <p className="moment-invite">Tell him something private.</p>
        <Link href="/note" className="btn-primary moment-cta">
          Leave a private note
        </Link>
      </FadeContent>
    </section>
  );
}
