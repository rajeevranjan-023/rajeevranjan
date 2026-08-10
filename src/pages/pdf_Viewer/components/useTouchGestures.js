import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * useTouchGestures
 * ------------------------------------------------------------------
 * Adds native, app-like touch support to the PDF viewer:
 *
 *  - Single-finger horizontal swipe  -> next / previous page
 *  - Two-finger pinch                -> continuous, smooth zoom
 *
 * Two refs are used on purpose:
 *  - `containerRef` -> attached to the whole scrollable viewer area.
 *    Touch listeners live here so a swipe can start from anywhere on
 *    screen, not just directly on the page.
 *  - `targetRef`    -> attached to the exact element that actually
 *    gets `transform: scale()`d during a pinch (the page wrapper).
 *    The pinch origin MUST be measured against this element's own
 *    box, because CSS `transform-origin` percentages are resolved
 *    relative to the transformed element itself, not the outer
 *    container. Using the container's box here was the bug that made
 *    zooming look like the page was sliding around instead of
 *    zooming in place.
 *
 * Design notes:
 *  - Pinch feedback is applied as a live CSS transform on every
 *    touchmove, so zoom tracks your fingers 1:1 with no lag/steps.
 *    The real `scale` state (which makes react-pdf re-render the
 *    canvas) is only committed once, when the pinch ends.
 *  - Listeners are attached natively (not via React's onTouch* props)
 *    with { passive: false } on touchmove so preventDefault() reliably
 *    stops the browser's own pinch-zoom on real iOS/Android browsers.
 *  - A pinch "session" is tracked independently of individual finger
 *    lift/land events: once two fingers have touched down, no new
 *    swipe can start until *all* fingers are off the screen. Without
 *    this, lifting one finger from a pinch can make some mobile
 *    browsers fire a spurious touchstart for the still-down finger,
 *    which used to get misread as the start of a fresh swipe and fire
 *    an accidental page turn.
 *  - A swipe is only accepted if the motion is predominantly
 *    horizontal and past a distance threshold, so vertical scrolling
 *    of a tall page is never mistaken for a page turn.
 */
export function useTouchGestures({
  minScale,
  maxScale,
  scale,
  onPinchZoomChange, // (nextScale: number) => void  — called once, on pinch release
  onSwipeNext,       // () => void
  onSwipePrev,       // () => void
  disabled = false,
  swipeThreshold = 55,        // px of horizontal travel required to count as a swipe
  swipeDirectionRatio = 0.6,  // vertical travel must stay below this * horizontal travel
}) {
  const containerRef = useRef(null); // listens for touch events (full viewer area)
  const targetRef = useRef(null);    // the element that actually gets scaled (the page)

  // Live (uncommitted) pinch feedback, applied as a CSS transform.
  const [pinchTransform, setPinchTransform] = useState(null); // { scale, originX, originY } | null
  const [isPinching, setIsPinching] = useState(false);
  const [livePercent, setLivePercent] = useState(null);

  const gesture = useRef({
    mode: null,          // 'swipe' | 'pinch' | null
    startX: 0,
    startY: 0,
    startDistance: 0,
    startScale: 1,
    originXPct: 50,
    originYPct: 50,
    pendingScale: null,
    activeTouches: 0,    // how many fingers are currently down, across the whole gesture
    lockedUntilAllUp: false, // true once a pinch has happened this touch session
  });

  const getDistance = (t0, t1) => {
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  };

  const getMidpoint = (t0, t1) => ({
    x: (t0.clientX + t1.clientX) / 2,
    y: (t0.clientY + t1.clientY) / 2,
  });

  const resetGesture = useCallback(() => {
    gesture.current.mode = null;
    gesture.current.pendingScale = null;
    setPinchTransform(null);
    setIsPinching(false);
    setLivePercent(null);
  }, []);

  const beginPinch = useCallback((t0, t1) => {
    const target = targetRef.current || containerRef.current;
    const mid = getMidpoint(t0, t1);
    let originXPct = 50;
    let originYPct = 50;
    if (target) {
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height) {
        // Percentages relative to the TARGET's own box, matching how
        // CSS transform-origin resolves them.
        originXPct = ((mid.x - rect.left) / rect.width) * 100;
        originYPct = ((mid.y - rect.top) / rect.height) * 100;
      }
    }
    gesture.current.mode = 'pinch';
    gesture.current.lockedUntilAllUp = true;
    gesture.current.startDistance = getDistance(t0, t1);
    gesture.current.startScale = scale;
    gesture.current.originXPct = originXPct;
    gesture.current.originYPct = originYPct;
    gesture.current.pendingScale = scale;
    setIsPinching(true);
    setPinchTransform({ scale: 1, originX: `${originXPct}%`, originY: `${originYPct}%` });
    setLivePercent(Math.round(scale * 100));
  }, [scale]);

  const handleTouchStart = useCallback((e) => {
    gesture.current.activeTouches = e.touches.length;

    if (disabled) return;
    const touches = e.touches;

    if (touches.length === 2) {
      beginPinch(touches[0], touches[1]);
    } else if (touches.length === 1) {
      // Ignore stray single-finger touchstarts that belong to a pinch
      // session that hasn't fully ended yet (see note above).
      if (gesture.current.lockedUntilAllUp) return;
      gesture.current.mode = 'swipe';
      gesture.current.startX = touches[0].clientX;
      gesture.current.startY = touches[0].clientY;
    } else if (touches.length > 2) {
      // A third finger landed mid-gesture — bail out of page-turn
      // detection entirely until everything lifts.
      gesture.current.mode = null;
      gesture.current.lockedUntilAllUp = true;
    }
  }, [disabled, beginPinch]);

  const handleTouchMove = useCallback((e) => {
    if (disabled) return;
    const touches = e.touches;

    if (gesture.current.mode === 'pinch' && touches.length === 2) {
      // Stop the browser's native pinch-zoom / page-level zoom.
      e.preventDefault();

      const dist = getDistance(touches[0], touches[1]);
      const ratio = dist / (gesture.current.startDistance || dist);
      let nextScale = gesture.current.startScale * ratio;
      nextScale = Math.min(maxScale, Math.max(minScale, nextScale));

      gesture.current.pendingScale = nextScale;

      // Purely visual, continuous — no stepping, no re-render of the PDF.
      const visualScale = nextScale / gesture.current.startScale;
      setPinchTransform({
        scale: visualScale,
        originX: `${gesture.current.originXPct}%`,
        originY: `${gesture.current.originYPct}%`,
      });
      setLivePercent(Math.round(nextScale * 100));
    } else if (gesture.current.mode === 'swipe' && touches.length === 1) {
      const dx = touches[0].clientX - gesture.current.startX;
      const dy = touches[0].clientY - gesture.current.startY;
      // Motion is mostly vertical -> this is a scroll, not a swipe. Bail
      // out so the browser's native vertical scrolling stays untouched.
      if (Math.abs(dy) > Math.abs(dx) * 1.15) {
        gesture.current.mode = null;
      }
    }
  }, [disabled, minScale, maxScale]);

  const handleTouchEnd = useCallback((e) => {
    gesture.current.activeTouches = e.touches.length;

    if (gesture.current.mode === 'pinch') {
      // Only commit once every finger involved in the pinch has lifted.
      if (e.touches.length < 2) {
        const finalScale = gesture.current.pendingScale;
        if (finalScale != null && onPinchZoomChange) {
          onPinchZoomChange(+finalScale.toFixed(2));
        }
        resetGesture();
      }
    } else if (gesture.current.mode === 'swipe') {
      const touch = e.changedTouches[0];
      const dx = gesture.current.startX - touch.clientX;
      const dy = gesture.current.startY - touch.clientY;
      const horizontalEnough = Math.abs(dx) >= swipeThreshold;
      const notADiagonalScroll = Math.abs(dy) < Math.abs(dx) * swipeDirectionRatio;

      if (!disabled && horizontalEnough && notADiagonalScroll) {
        if (dx > 0) onSwipeNext && onSwipeNext();
        else onSwipePrev && onSwipePrev();
      }
      resetGesture();
    }

    // Only clear the pinch-session lock once every finger is fully off
    // the screen — this is what stops a phantom touchstart from being
    // misread as a fresh swipe right after a pinch.
    if (e.touches.length === 0) {
      gesture.current.lockedUntilAllUp = false;
      gesture.current.mode = null;
    }
  }, [disabled, onPinchZoomChange, onSwipeNext, onSwipePrev, resetGesture, swipeDirectionRatio, swipeThreshold]);

  const handleTouchCancel = useCallback((e) => {
    gesture.current.activeTouches = e.touches ? e.touches.length : 0;
    if (!e.touches || e.touches.length === 0) {
      gesture.current.lockedUntilAllUp = false;
    }
    resetGesture();
  }, [resetGesture]);

  // Native listeners (not React's onTouch* props) so preventDefault()
  // actually works — React attaches touchmove as passive by default,
  // which silently ignores preventDefault() on real mobile browsers.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: false });
    node.addEventListener('touchend', handleTouchEnd, { passive: true });
    node.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel]);

  return {
    containerRef,
    targetRef,
    pinchTransform, // null when not pinching, otherwise { scale, originX, originY }
    isPinching,
    livePercent,    // live zoom % to show in an on-screen badge while pinching
  };
}
