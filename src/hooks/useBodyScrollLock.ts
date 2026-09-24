"use client";

import { useEffect, useState } from "react";

/**
 * Locks page scroll while a full-screen overlay (menu panel or modal) is open and
 * publishes the state on `<body data-overlay-open="true">` so floating UI
 * (sticky CTA bar, back-to-top button) can hide itself without prop drilling.
 *
 * `scrollbar-gutter: stable` prevents the layout shift that would otherwise occur
 * when the scrollbar disappears.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const root = document.documentElement;
    root.classList.add("menu-open");
    document.body.dataset.overlayOpen = "true";

    return () => {
      root.classList.remove("menu-open");
      delete document.body.dataset.overlayOpen;
    };
  }, [isLocked]);
}

/** True while any overlay that locked the page is open. */
export function useOverlayOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const read = () => setIsOpen(document.body.dataset.overlayOpen === "true");
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-overlay-open"],
    });

    return () => observer.disconnect();
  }, []);

  return isOpen;
}

/** True while the visitor is typing in a form control (keyboard is up). */
export function useFormFieldFocused() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);

    const onFocusIn = (e: FocusEvent) => {
      if (isField(e.target)) setIsFocused(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (isField(e.target)) setIsFocused(false);
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return isFocused;
}

/**
 * Returns whether an element (by id) is currently intersecting the viewport.
 * Used to hide the sticky CTA while the hero prompt box or the footer is on screen.
 */
export function useElementInView(elementId: string, rootMargin = "0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [elementId, rootMargin]);

  return inView;
}
