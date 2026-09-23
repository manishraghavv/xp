import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline-dark" | "outline-light" | "gold" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function GlassButton({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  icon,
  ...props
}: GlassButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:-translate-y-0.5",
    "outline-dark":
      "border border-slate-700/60 bg-navy-800/40 text-slate-200 hover:border-brand-cyan hover:text-brand-cyan hover:bg-navy-800/70 backdrop-blur-md",
    "outline-light":
      "border border-slate-300/80 bg-white/70 text-slate-800 hover:border-brand-blue hover:text-brand-blue hover:bg-white backdrop-blur-md shadow-sm",
    gold: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5",
    secondary:
      "bg-slate-100/80 text-slate-900 hover:bg-slate-200/90 border border-slate-200",
  }[variant];

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, sizeClasses, variantClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, sizeClasses, variantClasses, className)} {...props}>
      {content}
    </button>
  );
}
