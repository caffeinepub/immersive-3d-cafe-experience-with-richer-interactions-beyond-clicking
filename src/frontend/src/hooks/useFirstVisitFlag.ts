import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'cafe-onboarding-dismissed';

export function useFirstVisitFlag() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(ONBOARDING_KEY);
    setIsFirstVisit(!dismissed);
  }, []);

  const dismissOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsFirstVisit(false);
  };

  const showOnboarding = () => {
    // Allow re-opening without changing first visit flag
  };

  return { isFirstVisit, dismissOnboarding, showOnboarding };
}
