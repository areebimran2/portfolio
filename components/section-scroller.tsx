"use client";

import { useEffect } from "react";

/**
 * Vertical "carousel" scrolling: any scroll gesture (wheel, trackpad, touch,
 * keyboard) moves to the next/previous section immediately, with no need to
 * scroll past a threshold.
 *
 * - One gesture moves one section. Trackpad momentum counts as part of the
 *   swipe that produced it, so a single swipe never skips a section.
 * - Input stays live during the animation: a new gesture chains to the
 *   following section, and reversing direction retargets immediately.
 * - Sections taller than the viewport (common on phones) scroll internally
 *   first, then move on with the next gesture once their edge is reached.
 * - Ctrl+wheel/pinch zoom, horizontal scrolling, scrollable child elements,
 *   form fields, and scrollbar dragging are left to the browser.
 *
 * Sections opt in with the `data-scroll-section` attribute.
 */

const SECTION_SELECTOR = "[data-scroll-section]";
const NAV_DURATION_MS = 700;
const INNER_DURATION_MS = 220;
// Wheel events further apart than this start a new gesture.
const GESTURE_GAP_MS = 180;
// After this long, a sharp rise in wheel delta means a new swipe interrupted
// trackpad momentum (momentum only decays).
const MOMENTUM_AFTER_MS = 280;
// Finger travel needed before a touch swipe navigates.
const SWIPE_THRESHOLD_PX = 24;
// How far touch momentum carries inside a tall section, per px/ms of speed.
const TOUCH_MOMENTUM_MS = 260;
// Sections overflowing the viewport by less than this (mostly padding) are
// treated as fitting, so navigation stays one gesture per section.
const OVERFLOW_TOLERANCE_PX = 64;
// Trackpads emit one or two tiny opposite-direction deltas as the finger
// lifts. Within a running gesture, a reversal is only a new swipe once it
// is sustained (several events, or enough distance); otherwise that jitter
// would bounce the page straight back. Judged by count and total rather than
// per-event size, because a slow deliberate reverse swipe also starts with
// tiny deltas (smaller still on scaled displays) and must not be ignored.
const REVERSAL_MIN_EVENTS = 3;
const REVERSAL_MIN_TOTAL_PX = 12;
const EPSILON_PX = 2;

type Direction = 1 | -1;
type Action = "nav" | "inner" | "none";

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

// True when an element between `target` and the page can itself scroll in
// `direction`; that element should get the gesture instead of the page.
function nestedScrollerCanTake(target: EventTarget | null, direction: Direction) {
  let el = target instanceof Element ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowY } = getComputedStyle(el);
    if (/(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight) {
      const atEdge =
        direction === 1
          ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1
          : el.scrollTop <= 0;
      if (!atEdge) return true;
    }
    el = el.parentElement;
  }
  return false;
}

export function SectionScroller() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let animating: Action = "none";
    let targetY = 0;
    let lastSetY = 0;
    // Section the page is resting on (top-aligned), used to stay aligned
    // across window resizes. Null while inside a tall section.
    let alignedIndex: number | null = 0;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    const dialogIsOpen = () =>
      Boolean(
        document.querySelector(
          '[data-slot="dialog-content"][data-state="open"]',
        ),
      );
    const viewportHeight = () => window.innerHeight;
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - viewportHeight());
    const clampY = (y: number) => Math.min(Math.max(0, y), maxScroll());

    const bounds = (section: HTMLElement) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      return { top, bottom: top + section.offsetHeight };
    };

    const isOversized = (section: HTMLElement) =>
      section.offsetHeight - viewportHeight() > OVERFLOW_TOLERANCE_PX;

    // For a section that "fits" (within the tolerance), how far past its top
    // the page can sit while still showing just that section. At the bottom
    // of the page the browser can only rest there, so it must count as being
    // on the section, not partway out of it.
    const restingSlack = (section: HTMLElement) =>
      isOversized(section) ? 0 : Math.max(0, section.offsetHeight - viewportHeight());

    const stop = () => {
      cancelAnimationFrame(frame);
      animating = "none";
    };

    const jumpTo = (y: number) => {
      window.scrollTo({ top: Math.round(clampY(y)), behavior: "instant" });
      // Record where the browser actually put us (it may clamp or round), so
      // the interruption check below compares like with like.
      lastSetY = window.scrollY;
    };

    const animateTo = (y: number, kind: Exclude<Action, "none">) => {
      const destination = clampY(y);
      cancelAnimationFrame(frame);
      targetY = destination;

      if (reducedMotion.matches) {
        animating = "none";
        jumpTo(destination);
        return;
      }

      const start = window.scrollY;
      const distance = destination - start;
      const duration = kind === "nav" ? NAV_DURATION_MS : INNER_DURATION_MS;
      const ease = kind === "nav" ? easeOutQuart : easeOutCubic;
      // Set from the first frame's own timestamp: rAF timestamps mark the
      // start of the frame and can be earlier than performance.now() here,
      // which would give a negative progress and overshoot backwards.
      let startTime: number | null = null;

      animating = kind;
      lastSetY = start;

      const step = (now: number) => {
        // Something else moved the page (scrollbar drag, anchor link, find in
        // page): yield to it instead of fighting it.
        if (Math.abs(window.scrollY - lastSetY) > EPSILON_PX) {
          animating = "none";
          return;
        }

        startTime ??= now;
        const progress = Math.min(1, Math.max(0, (now - startTime) / duration));
        jumpTo(start + distance * ease(progress));

        if (progress < 1) {
          frame = requestAnimationFrame(step);
        } else {
          animating = "none";
        }
      };

      frame = requestAnimationFrame(step);
    };

    // Index of the section whose area contains `y` (the viewport top).
    const indexAt = (sections: HTMLElement[], y: number) => {
      let index = 0;
      sections.forEach((section, i) => {
        if (bounds(section).top <= y + EPSILON_PX) index = i;
      });
      return index;
    };

    // Where the page is, or is about to be once the current animation lands.
    const settledY = () => (animating === "none" ? window.scrollY : targetY);

    // Room left to scroll inside the current tall section, in `direction`.
    const innerRoom = (direction: Direction, fromY: number) => {
      const sections = getSections();
      if (sections.length === 0) return 0;
      const section = sections[indexAt(sections, fromY)];
      if (!isOversized(section)) return 0;

      const { top, bottom } = bounds(section);
      const room =
        direction === 1 ? bottom - (fromY + viewportHeight()) : fromY - top;
      return room > EPSILON_PX ? room : 0;
    };

    const scrollInner = (direction: Direction, amount: number) => {
      const fromY = settledY();
      const room = innerRoom(direction, fromY);
      if (room === 0) return false;
      animateTo(fromY + direction * Math.min(Math.abs(amount), room), "inner");
      return true;
    };

    const navigate = (direction: Direction) => {
      const sections = getSections();
      if (sections.length === 0) return false;

      // Chain from where an in-flight animation is heading, so rapid gestures
      // advance section by section and reversals retarget immediately.
      const fromY = settledY();
      const index = indexAt(sections, fromY);
      const current = bounds(sections[index]);

      let destination: number | null = null;

      const restingEnd = current.top + restingSlack(sections[index]);
      if (direction === -1 && fromY > restingEnd + EPSILON_PX) {
        // Stranded between sections (e.g. after dragging the scrollbar):
        // settle back at the top of the current one.
        destination = current.top;
      } else {
        const next = sections[index + direction];
        if (next) {
          const { top, bottom } = bounds(next);
          // Going up into a tall section, land on its end so reading
          // continues naturally; otherwise align the section's top.
          destination =
            direction === -1 && isOversized(next)
              ? Math.max(top, bottom - viewportHeight())
              : top;
        }
      }

      if (destination === null) return false;
      animateTo(destination, "nav");
      return true;
    };

    // Scroll inside a tall section when there's room, otherwise move on.
    const act = (direction: Direction, innerAmount: number): Action => {
      if (scrollInner(direction, innerAmount)) return "inner";
      return navigate(direction) ? "nav" : "none";
    };

    // ---- Wheel and trackpad -------------------------------------------------

    let lastWheelTime = -Infinity;
    let lastWheelAbs = 0;
    let gestureStart = 0;
    let gestureDirection: Direction | 0 = 0;
    let gestureAction: Action = "none";
    let reversalEvents = 0;
    let reversalTotal = 0;

    const normalizeDelta = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 40;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * viewportHeight();
      }
      return event.deltaY;
    };

    const onWheel = (event: WheelEvent) => {
      // The dialog owns wheel input while experience details are open.
      if (dialogIsOpen()) return;
      // Ctrl+wheel and trackpad pinch are zoom; horizontal is not ours.
      if (event.defaultPrevented || event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = normalizeDelta(event);
      if (delta === 0) return;

      const direction: Direction = delta > 0 ? 1 : -1;
      if (nestedScrollerCanTake(event.target, direction)) return;

      event.preventDefault();

      const now = event.timeStamp;
      const abs = Math.abs(delta);
      const continuing = now - lastWheelTime <= GESTURE_GAP_MS;

      if (continuing && direction !== gestureDirection) {
        reversalEvents += 1;
        reversalTotal += abs;
        if (
          reversalEvents < REVERSAL_MIN_EVENTS &&
          reversalTotal < REVERSAL_MIN_TOTAL_PX
        ) {
          // Probably finger-lift jitter: keep the gesture alive but don't act.
          // Don't reset the momentum baseline either, or the next ordinary
          // momentum event would look like a sharp rise, i.e. a new swipe.
          lastWheelTime = now;
          return;
        }
      } else {
        reversalEvents = 0;
        reversalTotal = 0;
      }

      const isNewGesture =
        !continuing ||
        direction !== gestureDirection ||
        (now - gestureStart > MOMENTUM_AFTER_MS &&
          abs > lastWheelAbs * 1.5 &&
          abs - lastWheelAbs > 10);

      lastWheelTime = now;
      lastWheelAbs = abs;

      if (isNewGesture) {
        reversalEvents = 0;
        reversalTotal = 0;
        gestureStart = now;
        gestureDirection = direction;
        gestureAction = act(direction, abs);
      } else if (gestureAction === "inner") {
        // Keep following the trackpad inside a tall section, but never let
        // the tail of this gesture spill over into the next section.
        scrollInner(direction, abs);
      }
    };

    // ---- Touch --------------------------------------------------------------

    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastY = 0;
    let touchLastTime = 0;
    let touchVelocity = 0; // px per ms, positive = scrolling down
    let touchAction: Action = "none";
    let touchAxis: "pending" | "horizontal" | "vertical" = "pending";
    let touchTracking = false;

    const onTouchStart = (event: TouchEvent) => {
      if (dialogIsOpen()) {
        touchTracking = false;
        return;
      }
      touchTracking = event.touches.length === 1;
      if (!touchTracking) return;
      // A finger down halts in-section momentum, like native scrolling. A
      // section transition is left to land so a tap never strands the page
      // between sections; a new swipe chains from its destination instead.
      if (animating === "inner") stop();
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touchLastY = touch.clientY;
      touchLastTime = event.timeStamp;
      touchVelocity = 0;
      touchAction = "none";
      touchAxis = "pending";
    };

    const onTouchMove = (event: TouchEvent) => {
      // Pinch-zoom and multi-finger gestures belong to the browser.
      if (!touchTracking || event.touches.length !== 1) {
        touchTracking = false;
        return;
      }

      const touch = event.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const horizontalTravel = x - touchStartX;
      const verticalTravel = y - touchStartY;

      if (touchAxis === "pending") {
        const distance = Math.max(
          Math.abs(horizontalTravel),
          Math.abs(verticalTravel),
        );
        if (distance < 8) return;
        touchAxis =
          Math.abs(horizontalTravel) > Math.abs(verticalTravel)
            ? "horizontal"
            : "vertical";
      }

      // Horizontal drags belong to components such as the project carousel.
      if (touchAxis === "horizontal") {
        touchTracking = false;
        return;
      }

      const travel = touchStartY - y;
      const delta = touchLastY - y;
      const elapsed = Math.max(1, event.timeStamp - touchLastTime);
      touchVelocity = 0.7 * (delta / elapsed) + 0.3 * touchVelocity;
      touchLastY = y;
      touchLastTime = event.timeStamp;

      if (touchAction === "none" && travel !== 0) {
        const direction: Direction = travel > 0 ? 1 : -1;
        if (nestedScrollerCanTake(event.target, direction)) {
          touchTracking = false;
          return;
        }
      }

      event.preventDefault();
      if (delta === 0 || touchAction === "nav") return;

      if (touchAction === "none") {
        const direction: Direction = travel > 0 ? 1 : -1;
        const room = innerRoom(direction, window.scrollY);
        if (room > 0) {
          touchAction = "inner";
        } else if (Math.abs(travel) >= SWIPE_THRESHOLD_PX) {
          touchAction = navigate(direction) ? "nav" : "none";
          return;
        } else {
          return;
        }
      }

      // Inside a tall section the page follows the finger 1:1.
      const direction: Direction = delta > 0 ? 1 : -1;
      const room = innerRoom(direction, window.scrollY);
      if (room > 0) {
        jumpTo(window.scrollY + direction * Math.min(Math.abs(delta), room));
      }
    };

    const onTouchEnd = () => {
      if (touchTracking && touchAction === "inner" && Math.abs(touchVelocity) > 0.2) {
        const direction: Direction = touchVelocity > 0 ? 1 : -1;
        scrollInner(direction, Math.abs(touchVelocity) * TOUCH_MOMENTUM_MS);
      }
      touchTracking = false;
    };

    // ---- Keyboard -----------------------------------------------------------

    const isTypingTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

    const onKeyDown = (event: KeyboardEvent) => {
      if (dialogIsOpen()) return;
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      if (isTypingTarget(event.target)) return;

      const page = viewportHeight() * 0.85;
      let direction: Direction;
      let amount: number;

      switch (event.key) {
        case "ArrowDown":
          [direction, amount] = [1, 80];
          break;
        case "ArrowUp":
          [direction, amount] = [-1, 80];
          break;
        case "PageDown":
          [direction, amount] = [1, page];
          break;
        case "PageUp":
          [direction, amount] = [-1, page];
          break;
        case " ":
          // Space activates a focused button; leave that alone.
          if (event.target instanceof HTMLButtonElement) return;
          [direction, amount] = [event.shiftKey ? -1 : 1, page];
          break;
        case "Home":
          event.preventDefault();
          animateTo(0, "nav");
          return;
        case "End":
          event.preventDefault();
          animateTo(maxScroll(), "nav");
          return;
        default:
          return;
      }

      event.preventDefault();
      // Held keys auto-repeat quickly; let each section land first.
      if (event.repeat && animating === "nav") return;
      act(direction, amount);
    };

    // ---- Stay aligned across resizes and orientation changes ---------------

    let idleTimer = 0;
    const onScroll = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (animating !== "none") return;
        const sections = getSections();
        const y = window.scrollY;
        const index = sections.findIndex(
          (section) => Math.abs(bounds(section).top - y) <= EPSILON_PX,
        );
        alignedIndex = index === -1 ? null : index;
      }, 120);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (alignedIndex === null || animating !== "none") return;
        const section = getSections()[alignedIndex];
        if (section) jumpTo(clampY(bounds(section).top));
      }, 120);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
