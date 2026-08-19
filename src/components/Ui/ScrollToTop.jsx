import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH") {
      // 👉 new page → top
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    // 👉 POP (back) → do nothing (browser handle karega)
  }, [pathname, navigationType]);

  return null;
}