import DisableInspect from "@/components/DisableInspect";
import FloatingCTA from "@/components/FloatingCTA";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/components/LanguageContext";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  // Without this, Next emits relative canonical/og:url values.
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default:
      "Brit Soap | Industrial Soap Making Machinery & Complete Soap Plants",
  },
  description:
    "Brit Soap Machinery manufactures complete soap production plants — saponification, drying, refining, cutting and stamping machines.",
  keywords: [
    "soap machinery",
    "soap making machine",
    "soap manufacturing equipment",
    "soap plant manufacturer",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <DisableInspect />
        <FloatingCTA />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
