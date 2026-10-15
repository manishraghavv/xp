import React from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "ul" | "ol" | "section" | "dl";

interface RevealGroupProps {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wrapper for a list or grid: every direct child drops in as one block (tier 3)
 * and siblings cascade top to bottom (see .reveal-group in globals.css). Pure
 * CSS; it adds no state and no client JavaScript.
 */
export function RevealGroup({ as = "div", className, children }: RevealGroupProps) {
  const Component = as;
  return <Component className={cn("reveal-group", className)}>{children}</Component>;
}
