"use client";

import * as React from "react";

type FocusSignalProps = {
  statements: string[];
};

const SLIDE_INTERVAL_MS = 3800;
const SLIDE_DURATION_MS = 1050;

export function FocusSignal({ statements }: FocusSignalProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [shouldAnimate, setShouldAnimate] = React.useState(true);

  React.useEffect(() => {
    if (statements.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => Math.min(current + 1, statements.length));
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [statements.length]);

  if (statements.length === 0) return null;

  // Repeating the first statement lets the last slide continue moving left.
  // The track then resets to the identical first slide without a visible jump.
  const slides =
    statements.length > 1 ? [...statements, statements[0]] : statements;

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (activeIndex !== statements.length) return;

    setShouldAnimate(false);
    setActiveIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShouldAnimate(true));
    });
  };

  return (
    <div className="focus-reel mt-7 min-h-12 w-full max-w-md overflow-hidden px-2">
      <p className="sr-only">Areas of focus: {statements.join(", ")}</p>
      <div
        aria-hidden="true"
        onTransitionEnd={handleTransitionEnd}
        className="flex min-h-12 items-center will-change-transform"
        style={{
          transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          transitionDuration: shouldAnimate ? `${SLIDE_DURATION_MS}ms` : "0ms",
          transitionProperty: "transform",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {slides.map((statement, index) => (
          <div
            key={`${statement}-${index}`}
            className="flex min-w-full items-center justify-center gap-2.5 px-3 font-mono text-sm text-muted-foreground sm:text-[0.9375rem]"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgb(113_151_208/0.65)]" />
            <span className="leading-6">{statement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
