"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrivalHero } from "@/components/acts/ArrivalHero";
import { KnowSamuel } from "@/components/acts/KnowSamuel";
import { ClosingMoment } from "@/components/ClosingMoment";
import { BirthdayBackdrop } from "@/components/ui/BirthdayBackdrop";
import { SITE } from "@/lib/config";
import { track } from "@/lib/analytics";

const MODAL_DELAY_MS = 2600;

export function HomeExperience() {
  const [open, setOpen] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  function animateIn() {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { opacity: 1, scale: 1, filter: "none", y: 0 });
      return;
    }
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(
      panel,
      { opacity: 0, scale: 0.92, y: 28, filter: "blur(12px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
    );
  }

  function closeModal() {
    const revealPin = () => {
      if (hasOpenedRef.current) setPinVisible(true);
      setOpen(false);
    };

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      revealPin();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealPin();
      return;
    }
    gsap.to(panel, {
      opacity: 0,
      scale: 0.94,
      y: 16,
      filter: "blur(8px)",
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: revealPin,
    });
  }

  function openModal() {
    hasOpenedRef.current = true;
    setOpen(true);
    track("note_modal_opened", { source: "pin" });
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      hasOpenedRef.current = true;
      setOpen(true);
      track("note_modal_opened", { source: "auto" });
    }, MODAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      animateIn();
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {pinVisible && !open ? (
        <button
          type="button"
          className="note-pin"
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="note-pin-dot" aria-hidden />
          Wish {SITE.name} a happy birthday
        </button>
      ) : null}

      <ArrivalHero />
      <KnowSamuel />
      <ClosingMoment />

      {open ? (
        <div
          ref={overlayRef}
          className="modal-root"
          role="presentation"
          style={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <BirthdayBackdrop fixed className="modal-backdrop" />
          <div
            ref={panelRef}
            className="modal-panel modal-invite panel glass-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={{ opacity: 0 }}
          >
            <button
              ref={closeRef}
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <div className="modal-intro">
              <p className="mono-label">Birthday wish · private</p>
              <h2 id={titleId}>Wish {SITE.name} a happy birthday</h2>
              <p className="lede modal-lede">
                Write a birthday note or wish only he will see — encouragement,
                a memory, or a simple happy birthday.
              </p>
              <Link href="/note" className="btn-primary modal-cta">
                Leave a birthday wish
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
