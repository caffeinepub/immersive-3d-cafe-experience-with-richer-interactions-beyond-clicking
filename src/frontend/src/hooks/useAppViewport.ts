import { useEffect } from 'react';

/**
 * Hook that tracks the visual viewport height and sets a CSS variable
 * to stabilize layout against mobile browser chrome (address bar) resizing.
 * This prevents unwanted scrolling when the address bar shows/hides.
 */
export function useAppViewport() {
  useEffect(() => {
    const updateViewportHeight = () => {
      // Use visualViewport when available (modern mobile browsers)
      const height = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${height}px`);
    };

    // Initial set
    updateViewportHeight();

    // Listen to visual viewport changes (mobile address bar show/hide)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
      window.visualViewport.addEventListener('scroll', updateViewportHeight);
    }

    // Fallback for browsers without visualViewport
    window.addEventListener('resize', updateViewportHeight);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
        window.visualViewport.removeEventListener('scroll', updateViewportHeight);
      }
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);
}
