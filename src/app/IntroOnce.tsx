"use client";
import React from "react";

/**
 * İlk ziyaret: localStorage.setItem("intro_seen","1")
 * Sonraki ziyaretler: intro/splash/preloader benzeri overlay’leri gizle.
 * Seçiciler genel: #intro, .intro, [data-intro], .splash, .preloader, [data-splash]
 */
const SELECTOR = "#intro,.intro,[data-intro],.splash,.preloader,[data-splash]";

export default function IntroOnce() {
  React.useEffect(() => {
    try {
      const seen =
        typeof window !== "undefined" &&
        window.localStorage?.getItem("intro_seen") === "1";
      if (seen) {
        const style = document.createElement("style");
        style.textContent = `${SELECTOR}{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}`;
        document.head.appendChild(style);

        const hide = () => {
          document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
            el.style.display = "none";
            el.style.visibility = "hidden";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
          });
        };
        hide();
        const mo = new MutationObserver(hide);
        mo.observe(document.documentElement, { childList: true, subtree: true });
        return () => mo.disconnect();
      } else {
        window.localStorage?.setItem("intro_seen", "1");
      }
    } catch {}
  }, []);
  return null;
}
