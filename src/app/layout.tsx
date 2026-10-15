import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, outfit } from "@/lib/fonts";
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

const REVEAL_FALLBACK = `(function(){try{
if(!('IntersectionObserver' in window)||(window.CSS&&CSS.supports&&CSS.supports('animation-timeline','view()'))||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var SKIP='.no-reveal,[data-no-reveal],.page-hero,form,[role=alert],[role=status]';
var SEL=[['.wi-scroll','word'],['.wi-scroll-fast','fast'],['.reveal-1,main h2:not(:has(.wi)),main h3:not(:has(.wi)),main h4:not(:has(.wi)),footer h4','head'],['.reveal-2,.reveal-3,.reveal-group>*,main p:not(:has(.wi)),main li,main dd,main td,main figcaption,main blockquote,footer li,footer p','block']];
function go(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
var seen=new Set();SEL.forEach(function(s){document.querySelectorAll(s[0]).forEach(function(el){if(seen.has(el)||el.closest(SKIP)||(s[1]!=='word'&&s[1]!=='fast'&&el.closest('li p,td p')&&el.tagName==='P'))return;seen.add(el);var i=Array.prototype.indexOf.call(el.parentNode.children,el)%6;el.style.setProperty('--rd',(s[1]==='word'||s[1]==='fast'?(+getComputedStyle(el).getPropertyValue('--i')||0)*0.04:i*0.06)+'s');el.setAttribute('data-reveal',s[1]);io.observe(el)})});
document.documentElement.classList.add('js-reveal')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go()
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Scroll-reveal fallback. Does nothing where CSS scroll-driven animation works
            (Chrome, Edge) or with reduced motion; elsewhere it tags text, hides it and
            reveals it once with an IntersectionObserver. If it throws, text stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_FALLBACK }} />
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
