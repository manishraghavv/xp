import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // `viewport-fit=cover` lets the floating bar and sticky CTA respect notches
  // via env(safe-area-inset-*).
  viewportFit: "cover",
  themeColor: "#0A1030",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xpmindglobal.com"),
  title: {
    default: "XpmindGlobal | SAP® Consulting, S/4HANA & Digital Transformation | India",
    template: "%s | XpmindGlobal",
  },
  description:
    "XpmindGlobal is a specialist SAP® consulting firm offering SAP® Cloud, S/4HANA migration, AMS, GRC, Analytics, and digital transformation. 20+ years of expertise. Greater Noida, India.",
  keywords: [
    "XpmindGlobal",
    "SAP® consulting India",
    "S/4HANA implementation",
    "SAP® migration ECC",
    "SAP® AMS",
    "SAP® FICO",
    "SAP® cloud BTP",
    "ERP consulting Greater Noida",
    "SAP® GRC",
    "SAP® analytics",
    "digital transformation SAP®",
  ],
  authors: [{ name: "XpmindGlobal" }],
  creator: "XpmindGlobal",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.xpmindglobal.com",
    title: "XpmindGlobal | SAP® Consulting & S/4HANA Services India",
    description:
      "XpmindGlobal — 20+ years of SAP® expertise across Cloud, Analytics, GRC, S/4HANA, AMS and Implementation. Serving Manufacturing, FMCG, Power & Energy.",
    siteName: "XpmindGlobal",
    images: [
      {
        url: "/xp.png",
        width: 1200,
        height: 630,
        alt: "XpmindGlobal SAP Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XpmindGlobal | SAP® Consulting & S/4HANA Services India",
    description:
      "XpmindGlobal — 20+ years of SAP® expertise across Cloud, Analytics, GRC, S/4HANA, AMS and Implementation.",
    images: ["/xp.png"],
  },
  icons: {
    icon: "/xp.png",
    shortcut: "/xp.png",
    apple: "/xp.png",
  },
};

// Organization & LocalBusiness JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.xpmindglobal.com/#organization",
      name: "XpmindGlobal",
      url: "https://www.xpmindglobal.com",
      logo: "https://www.xpmindglobal.com/xp.png",
      email: "info@xpmindglobal.com",
      telephone: "+91-9711011844",
      description:
        "Specialist SAP® consulting firm providing S/4HANA migration, Cloud, AMS, GRC, and Analytics services.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 12110, 12th Floor, Gaur City Mall, Greater Noida West",
        addressLocality: "Ghaziabad",
        addressRegion: "UP",
        postalCode: "201318",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.xpmindglobal.com/#website",
      "url": "https://www.xpmindglobal.com",
      "name": "XpmindGlobal",
      "description": "Specialist SAP® Consulting, S/4HANA Migration & Digital Transformation",
      "publisher": {
        "@id": "https://www.xpmindglobal.com/#organization"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.xpmindglobal.com/#localbusiness",
      name: "XpmindGlobal",
      image: "https://www.xpmindglobal.com/xp.png",
      url: "https://www.xpmindglobal.com",
      telephone: "+91-9711011844",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. 12110, 12th Floor, Gaur City Mall, Greater Noida West",
        addressLocality: "Ghaziabad",
        addressRegion: "UP",
        postalCode: "201318",
        addressCountry: "IN",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100svh] flex flex-col bg-[#0A1030] text-slate-900 antialiased selection:bg-brand-cyan/20 selection:text-brand-blue">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <FloatingNavbar />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

        <Footer />
        <FloatingActions />
        <MobileBottomBar />
      </body>
    </html>
  );
}
