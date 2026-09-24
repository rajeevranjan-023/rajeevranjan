import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import analytics from "../utils/analytics";

export function useAnalyticsInit(userId) {
  useEffect(() => {
    analytics.init(userId);
  }, []);

  useEffect(() => {
    if (userId) analytics.setUserId(userId);
  }, [userId]);
}

export function useAnalyticsPageView() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
}

export default useAnalyticsInit;
