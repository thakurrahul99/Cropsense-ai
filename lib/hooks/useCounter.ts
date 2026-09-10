import { useState, useEffect } from "react";

/**
 * Animated counter that smoothly increments from 0 to `target`
 * over `duration` ms using a cubic ease-out, triggered when `inView` becomes true.
 *
 * @param target   - The final numeric value
 * @param duration - Animation duration in ms (default 2000)
 * @param inView   - Whether the element is visible (start trigger)
 */
export function useCounter(
  target: number,
  duration: number = 2000,
  inView: boolean
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration, inView]);

  return count;
}
