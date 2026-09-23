"use client";

import Script from "next/script";

/** Brit Soap's GA4 property. Override with NEXT_PUBLIC_GA_ID if it ever changes. */
const DEFAULT_GA_ID = "G-MSLVT8GKGF";

/**
 * Loads GA4 on the deployed site. Skipped during `next dev` so local work does
 * not land in the production property.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;

  if (!gaId || process.env.NODE_ENV === "development") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
