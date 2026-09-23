import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export function PillButton({
  href,
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}: PillButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary:
      "btn-pill-gradient font-semibold tracking-wide",
    secondary:
      "bg-navy-900/80 hover:bg-navy-800 text-white border border-slate-700/80 backdrop-blur-md shadow-lg hover:shadow-xl font-medium",
    glass:
      "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl shadow-lg hover:shadow-xl font-medium",
    outline:
      "bg-transparent hover:bg-brand-blue/10 text-brand-blue border border-brand-blue/40 font-medium",
  }[variant];

  const combinedClasses = cn(
    "inline-flex items-center justify-center rounded-full transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:ring-offset-2",
    sizeStyles,
    variantStyles,
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
