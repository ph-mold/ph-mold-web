import { useRef, useState, useEffect } from "react";

export function useDelayedRender(
  isActive: boolean,
  { delay = 200, minDuration = 500 } = {}
): boolean {
  const [shouldRender, setShouldRender] = useState(false);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const minTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      delayTimerRef.current = setTimeout(() => {
        setShouldRender(true);
        minTimerRef.current = setTimeout(() => {}, minDuration);
      }, delay);
    } else {
      if (shouldRender) {
        minTimerRef.current = setTimeout(() => {
          setShouldRender(false);
        }, minDuration);
      } else {
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      }
    }

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (minTimerRef.current) clearTimeout(minTimerRef.current);
    };
  }, [isActive]);

  return shouldRender;
}
