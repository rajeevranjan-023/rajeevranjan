import { useRef, useState, useEffect, useCallback } from 'react';


const SWIPE_THRESHOLD = 55; // px of horizontal travel required to count as a page turn
const SWIPE_RESTRAINT = 90; // max vertical travel allowed before we treat it as a scroll, not a swipe
const DIRECTION_LOCK_PX = 8; // px of movement before we decide "this is horizontal" vs "this is a scroll"
const ZOOM_BADGE_LINGER_MS = 650; // how long the % badge stays visible after pinch ends

export default function usePdfTouchGestures({
  containerRef,
  enabled = true,
  onSwipeLeft, // -> next page
  onSwipeRight, // -> previous page
  canSwipeLeft = true,
  canSwipeRight = true,
  scale,
  onScaleChange,
  minScale,
  maxScale,
}) {
  const gesture = useRef({
    mode: null, // 'swipe' | 'pinch' | null
    startX: 0,
    startY: 0,
    locked: false, // direction has been decided for the current swipe
  });
  const pinch = useRef({ startDistance: 0, startScale: 1 });
  const badgeTimer = useRef(null);

  const [dragX, setDragX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [liveZoomPct, setLiveZoomPct] = useState(null);

  const distanceBetween = (touches) => {
    const [a, b] = touches;
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  const resetSwipe = useCallback(() => {
    gesture.current.mode = null;
    gesture.current.locked = false;
    setDragX(0);
    setIsSwiping(false);
  }, []);

  const scheduleBadgeHide = useCallback(() => {
    if (badgeTimer.current) clearTimeout(badgeTimer.current);
    badgeTimer.current = setTimeout(() => setLiveZoomPct(null), ZOOM_BADGE_LINGER_MS);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return undefined;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        // Two fingers down: start (or switch to) pinch mode.
        gesture.current.mode = 'pinch';
        gesture.current.locked = false;
        pinch.current.startDistance = distanceBetween(e.touches);
        pinch.current.startScale = scale;
        setIsPinching(true);
        setDragX(0);
        setIsSwiping(false);
      } else if (e.touches.length === 1) {
        gesture.current.mode = 'swipe';
        gesture.current.locked = false;
        gesture.current.startX = e.touches[0].clientX;
        gesture.current.startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      const state = gesture.current;

      if (state.mode === 'pinch' && e.touches.length === 2) {
        // Stop the browser's native viewport pinch-zoom from also firing.
        e.preventDefault();
        const newDistance = distanceBetween(e.touches);
        if (pinch.current.startDistance > 0) {
          const ratio = newDistance / pinch.current.startDistance;
          const next = Math.min(maxScale, Math.max(minScale, pinch.current.startScale * ratio));
          setLiveZoomPct(Math.round(next * 100));
          onScaleChange(next);
        }
        return;
      }

      if (state.mode === 'swipe' && e.touches.length === 1) {
        const dx = e.touches[0].clientX - state.startX;
        const dy = e.touches[0].clientY - state.startY;

        if (!state.locked) {
          if (Math.abs(dx) < DIRECTION_LOCK_PX && Math.abs(dy) < DIRECTION_LOCK_PX) {
            return; // not enough movement yet to know intent
          }
          // Decide once: horizontal swipe, or leave it to native vertical scroll.
          state.locked = Math.abs(dx) > Math.abs(dy);
          if (!state.locked) {
            state.mode = null; // hand off to normal scrolling entirely
            return;
          }
          setIsSwiping(true);
        }

      
        let visualDx = dx;
        if ((dx < 0 && !canSwipeLeft) || (dx > 0 && !canSwipeRight)) {
          visualDx = dx / 3.2;
        }

        e.preventDefault(); 
        setDragX(visualDx);
      }
    };

    const handleTouchEnd = (e) => {
      const state = gesture.current;

      if (state.mode === 'pinch') {
        if (e.touches.length < 2) {
          setIsPinching(false);
          state.mode = null;
          scheduleBadgeHide();
        }
        return;
      }

      if (state.mode === 'swipe') {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - state.startX;
        const dy = touch.clientY - state.startY;

        if (state.locked && Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dy) <= SWIPE_RESTRAINT) {
          if (dx < 0 && canSwipeLeft) {
            onSwipeLeft?.();
          } else if (dx > 0 && canSwipeRight) {
            onSwipeRight?.();
          }
        }
        resetSwipe();
      }
    };

    const handleTouchCancel = () => {
      resetSwipe();
      setIsPinching(false);
    };

    const preventGesture = (e) => e.preventDefault();

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    el.addEventListener('gesturestart', preventGesture, { passive: false });
    el.addEventListener('gesturechange', preventGesture, { passive: false });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchCancel);
      el.removeEventListener('gesturestart', preventGesture);
      el.removeEventListener('gesturechange', preventGesture);
      if (badgeTimer.current) clearTimeout(badgeTimer.current);
    };
  }, [containerRef, enabled, scale, minScale, maxScale, canSwipeLeft, canSwipeRight, onScaleChange, onSwipeLeft, onSwipeRight, resetSwipe, scheduleBadgeHide]);

  return { dragX, isSwiping, isPinching, liveZoomPct };
}
