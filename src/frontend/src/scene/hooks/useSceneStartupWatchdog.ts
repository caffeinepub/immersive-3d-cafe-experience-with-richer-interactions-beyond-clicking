import { useEffect, useRef } from 'react';

interface UseSceneStartupWatchdogOptions {
  timeout: number;
  onTimeout: () => void;
  sceneKey: number;
}

/**
 * Watchdog hook that triggers a callback if the scene doesn't render
 * within the specified timeout. Resets on each scene remount (sceneKey change).
 */
export function useSceneStartupWatchdog({
  timeout,
  onTimeout,
  sceneKey,
}: UseSceneStartupWatchdogOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimedOutRef = useRef(false);

  useEffect(() => {
    // Reset timeout state on new scene attempt
    hasTimedOutRef.current = false;

    // Start watchdog timer
    timeoutRef.current = setTimeout(() => {
      if (!hasTimedOutRef.current) {
        hasTimedOutRef.current = true;
        onTimeout();
      }
    }, timeout);

    // Cleanup on unmount or sceneKey change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [sceneKey, timeout, onTimeout]);

  // Method to cancel the watchdog (called when scene renders successfully)
  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hasTimedOutRef.current = false;
  };

  return { cancel };
}
