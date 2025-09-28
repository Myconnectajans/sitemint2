"use client";
import React from "react";

const MESSAGE =
  "Web sitesi temanızı seçtikten sonra ödeme sonrası seçtiğiniz temanın rengini yazılarını ve logosunu bize bildiriniz(Ödeme sonrası form karşınıza çıkacaktır.) 3 gün içerisinde istediğiniz değişiklikler yapılacak ve siteniz yayınlanacaktır. İlgi ve Anlayışınız için teşekkür ederiz.";

const BYPASS_KEY = "kvkk_bypass_once";      // bir sonraki sayfa yüklemesinde modalı atla
const ACCEPT_TS  = "kvkk_accept_ts";        // (opsiyonel) son kabul zamanı

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
function isTarget(el: Element) {
  const txt = normalize(el.textContent || "");
  const href =
    (el as HTMLAnchorElement).getAttribute("href") ||
    (el as HTMLAnchorElement).href ||
    "";
  const nHref = normalize(href || "");
  const txtMatch =
    txt.includes("urunleri incele") ||
    txt.includes("ürünleri incele") ||
    txt.includes("web siteleri") ||
    txt.includes("web sitesi") ||
    txt.includes("websites") ||
    txt.includes("web site");
  const hrefMatch =
    nHref.includes("/web-siteleri") ||
    nHref.includes("/websites") ||
    nHref.includes("websiteleri") ||
    nHref.includes("/web-sitesi") ||
    nHref.includes("/websitesi");
  return txtMatch || hrefMatch;
}
function findClickable(node: EventTarget | null) {
  let el = node as Node | null;
  while (el && el instanceof Element) {
    if (el.matches('a,button,[role="button"]')) return el as Element;
    el = el.parentElement;
  }
  return null;
}

export default function KVKKConsent() {
  const [open, setOpen] = React.useState(false);
  const pendingRef = React.useRef<{ href?: string; trigger?: Element } | null>(null);
  const ignoreNextClick = React.useRef(false);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ignoreNextClick.current) {
        ignoreNextClick.current = false;
        return;
      }
      const el = findClickable(e.target);
      if (!el || !isTarget(el)) return;

      e.preventDefault();
      e.stopPropagation();

      const href =
        (el as HTMLAnchorElement).getAttribute("href") ||
        (el as HTMLAnchorElement).href ||
        "";
      pendingRef.current = href ? { href, trigger: el } : { trigger: el };
      setOpen(true);
    }
    document.addEventListener("click", onClick, true);

    try {
      const p = normalize(window.location.pathname);
      const match =
        p.includes("/web-siteleri") ||
        p.endsWith("/web-siteleri") ||
        p.includes("/websites") ||
        p.includes("websiteleri");

      // >>> BURASI YENİ: Kabulden hemen sonra sayfada modalı tekrar açmayı engelle
      const shouldBypass = (() => {
        try {
          if (sessionStorage?.getItem(BYPASS_KEY) === "1") {
            sessionStorage?.removeItem(BYPASS_KEY); // tek seferlik
            return true;
          }
          // emniyet kemeri: 10 saniye içinde tekrar açma
          const ts = Number(localStorage?.getItem(ACCEPT_TS) || "0");
          if (ts && Date.now() - ts < 10_000) return true;
        } catch {}
        return false;
      })();
      // <<< YENİ BİTİŞ

      if (match && !shouldBypass) {
        setTimeout(() => setOpen(true), 300);
      }
    } catch {}

    function onKey(e: KeyboardEvent) {
      if (open && e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  function accept() {
    // >>> BURASI YENİ: bir sonraki sayfa yüklemesinde modalı açma
    try {
      sessionStorage?.setItem(BYPASS_KEY, "1");
      localStorage?.setItem(ACCEPT_TS, String(Date.now()));
    } catch {}
    // <<< YENİ BİTİŞ

    const pending = pendingRef.current;
    setOpen(false);

    if (pending?.href) {
      // Doğrudan yönlendir
      window.location.assign(pending.href);
    } else if (pending?.trigger instanceof HTMLElement) {
      // Aynı elemanı tekrar tıklat; yakalama tekrar tetiklenmesin
      ignoreNextClick.current = true;
      pending.trigger.click();
    }
    pendingRef.current = null;
  }

  if (!open) return null;

  return (
    <div
      id="kvkk-consent-modal"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          maxWidth: 720,
          width: "92%",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
          overflow: "hidden",
          fontFamily:
            'system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji"'
        }}
      >
        <div
          style={{
            padding: "20px 22px",
            color: "#111",
            fontSize: 15,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap"
          }}
        >
          {MESSAGE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            padding: "14px 22px",
            background: "#f6f6f7",
            borderTop: "1px solid #eee"
          }}
        >
          <button
            onClick={accept}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              background: "#111",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Kabul ediyorum
          </button>
        </div>
      </div>
    </div>
  );
}
