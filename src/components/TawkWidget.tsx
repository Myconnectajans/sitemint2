// src/components/TawkWidget.tsx
"use client";

import Script from "next/script";

export default function TawkWidget() {
  const snippet = `
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/68d4a3d70a2eb21927877640/1j5va00g2';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  `.trim();

  // afterInteractive -> sayfa yüklenince client tarafta çalışır
  return <Script id="tawk-widget" strategy="afterInteractive">{snippet}</Script>;
}
