"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TabPillItem {
  id: string;
  label: string;
  /** Tooltip text shown on hover and keyboard focus (existing full name). */
  title?: string;
}

interface TabPillsProps {
  items: TabPillItem[];
  /** The committed (selected) tab. */
  value: string;
  /** Commit a selection: click, Enter, Space or arrow keys. */
  onChange: (id: string) => void;
  /**
   * Hover preview (mouse only). Called with an id after a short hover delay and
   * with null once the pointer has left the whole row. Never changes `value`.
   */
  onPreview?: (id: string | null) => void;
  ariaLabel: string;
  idPrefix: string;
  panelId: string;
  className?: string;
}

const HOVER_DELAY = 120;
const LEAVE_DELAY = 250;

/**
 * Reusable pill tabs: roving tabindex, aria-selected / aria-controls, arrow-key
 * navigation, premium hover feedback (see .tab-pill in globals.css) and an
 * optional debounced hover preview that is kept apart from the committed value.
 */
export function TabPills({
  items,
  value,
  onChange,
  onPreview,
  ariaLabel,
  idPrefix,
  panelId,
  className,
}: TabPillsProps) {
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const clearTimers = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hoverTimer.current = null;
    leaveTimer.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const commit = (id: string) => {
    clearTimers();
    onPreview?.(null);
    onChange(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    const id = items[next].id;
    commit(id);
    refs.current[id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={className}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse" && leaveTimer.current) {
          clearTimeout(leaveTimer.current);
          leaveTimer.current = null;
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse" || !onPreview) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
        leaveTimer.current = setTimeout(() => onPreview(null), LEAVE_DELAY);
      }}
    >
      {items.map((item, index) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-${item.id}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            data-tip={item.title}
            onClick={() => commit(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse" || !onPreview) return;
              if (hoverTimer.current) clearTimeout(hoverTimer.current);
              hoverTimer.current = setTimeout(() => onPreview(item.id), HOVER_DELAY);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              if (hoverTimer.current) clearTimeout(hoverTimer.current);
              hoverTimer.current = null;
            }}
            className={cn(
              "tab-pill p-3 rounded-2xl text-center font-mono font-bold text-sm border cursor-pointer",
              selected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
