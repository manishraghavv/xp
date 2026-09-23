import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "light",
  hoverEffect = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variant === "light" ? "glass-card-light" : "glass-card-dark text-white",
        !hoverEffect && "hover:transform-none hover:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
