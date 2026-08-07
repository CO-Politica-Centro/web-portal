"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type LeadershipDualPortraitProps = {
  className?: string;
  size?: "hero" | "compact";
  animateEntrance?: boolean;
};

export function LeadershipDualPortrait({
  className,
  size = "hero",
  animateEntrance = false,
}: LeadershipDualPortraitProps) {
  const { leadership } = site;
  const rootRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const reduced = usePrefersReducedMotion();
  const [showAvatar, setShowAvatar] = useState(false);
  const [busy, setBusy] = useState(false);
  const labelId = useId();

  const isHero = size === "hero";

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !animateEntrance || reduced) return;

      gsap.from(root, {
        scale: 0.92,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [animateEntrance, reduced] },
  );

  const swapTo = useCallback(
    (next: boolean) => {
      if (busy || next === showAvatar) return;

      const primary = primaryRef.current;
      const secondary = secondaryRef.current;
      if (!primary || !secondary || reduced) {
        setShowAvatar(next);
        return;
      }

      timelineRef.current?.kill();
      setBusy(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setBusy(false);
          timelineRef.current = null;
        },
      });
      timelineRef.current = tl;

      tl.to([primary, secondary], {
        scale: 0.9,
        opacity: 0.4,
        duration: 0.2,
        ease: "power2.in",
      })
        .add(() => setShowAvatar(next))
        .to([primary, secondary], {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
    },
    [busy, reduced, showAvatar],
  );

  const toggle = () => swapTo(!showAvatar);

  const primarySrc = showAvatar
    ? leadership.avatar.src
    : leadership.portrait.src;
  const primaryAlt = showAvatar
    ? leadership.avatar.alt
    : leadership.portrait.alt;
  const secondarySrc = showAvatar
    ? leadership.portrait.src
    : leadership.avatar.src;
  const secondaryAlt = showAvatar
    ? leadership.portrait.alt
    : leadership.avatar.alt;
  const secondaryLabel = showAvatar ? "Ver retrato" : "Ver en canales";

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto",
        isHero ? "w-full max-w-[22rem] sm:max-w-[26rem]" : "w-full max-w-64",
        className,
      )}
    >
      <p id={labelId} className="sr-only">
        Retrato de {leadership.name}. Pulsa el círculo pequeño para alternar
        entre la foto real y el avatar de canales.
      </p>

      <div
        ref={primaryRef}
        className="relative aspect-square w-full overflow-hidden rounded-full bg-black shadow-[0_24px_60px_-28px_rgb(26_31_22_/0.55)] ring-2 ring-[color-mix(in_srgb,var(--accent)_55%,transparent)]"
      >
        <Image
          key={primarySrc}
          src={primarySrc}
          alt={primaryAlt}
          fill
          sizes={isHero ? "(max-width: 640px) 88vw, 416px" : "256px"}
          className="object-cover object-center"
          priority={isHero && animateEntrance}
        />
      </div>

      <button
        ref={secondaryRef}
        type="button"
        onClick={toggle}
        onMouseEnter={() => {
          if (!reduced && !busy && !showAvatar) swapTo(true);
        }}
        onMouseLeave={() => {
          if (!reduced && !busy && showAvatar) swapTo(false);
        }}
        aria-labelledby={labelId}
        aria-pressed={showAvatar}
        aria-label={secondaryLabel}
        className={cn(
          "group ring-background absolute z-10 overflow-hidden rounded-full bg-black shadow-lg ring-2 transition-[transform,box-shadow] hover:scale-105 focus-visible:scale-105",
          "min-h-11 min-w-11",
          isHero
            ? "right-0 bottom-2 size-[30%] sm:bottom-3 sm:size-[28%]"
            : "right-0 bottom-1 size-[32%]",
        )}
      >
        <Image
          key={secondarySrc}
          src={secondarySrc}
          alt={secondaryAlt}
          fill
          sizes={isHero ? "120px" : "80px"}
          className="object-cover object-center"
        />
        <span
          className={cn(
            "bg-foreground/70 text-background pointer-events-none absolute inset-x-0 bottom-0 px-1 py-0.5 text-center text-[0.65rem] font-semibold tracking-wide uppercase",
            "opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100",
          )}
        >
          {showAvatar ? "Retrato" : "Canales"}
        </span>
      </button>
    </div>
  );
}
