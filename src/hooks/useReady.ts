"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __bpReady?: boolean;
  }
}

export const READY_EVENT = "bp:ready";

export function markReady() {
  window.__bpReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

/** True once the intro (preloader) has finished and the page may animate in. */
export function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__bpReady) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener(READY_EVENT, on);
    return () => window.removeEventListener(READY_EVENT, on);
  }, []);
  return ready;
}
