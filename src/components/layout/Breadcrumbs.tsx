import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "light" | "dark";
  className?: string;
}

export function Breadcrumbs({ items, theme = "light", className }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  // BreadcrumbList JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.xpmindglobal.com${item.href}` : undefined,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 text-xs sm:text-sm font-medium ${className || ""}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    theme === "dark" ? "text-slate-500" : "text-slate-400"
                  }`}
                />
              )}
              {isLast || !item.href ? (
                <span
                  className={
                    theme === "dark" ? "text-cyan-400 font-semibold" : "text-brand-blue font-semibold"
                  }
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors flex items-center ${
                    theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
