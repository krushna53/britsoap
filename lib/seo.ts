import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://britsoap.net";

export const SITE_NAME = "Brit Soap";

export const DEFAULT_OG_IMAGE = "/logo.png";

/** Turns "/about" into "https://britsoap.net/about". */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Google truncates meta descriptions past ~160 characters. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[.,;:—-]$/, "")}…`;
}

/**
 * Strips a trailing "| Brit Soap" / "| Brit Soap Machinery" so the layout's
 * title template does not append the brand a second time.
 */
export function stripBrandSuffix(title: string): string {
  return title.replace(/\s*\|\s*Brit\s*Soap(\s+Machinery)?\s*$/i, "").trim();
}

type SeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  /** Site-relative path, e.g. "/products/soap-stampers". */
  path: string;
  image?: string;
};

/** Builds page metadata with a canonical URL plus OpenGraph/Twitter tags. */
export function buildMetadata({
  title,
  description,
  keywords,
  path,
  image = DEFAULT_OG_IMAGE,
}: SeoInput): Metadata {
  const cleanTitle = stripBrandSuffix(title);
  const cleanDescription = clampDescription(description);
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${cleanTitle} | ${SITE_NAME}`,
      description: cleanDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: cleanTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanTitle} | ${SITE_NAME}`,
      description: cleanDescription,
      images: [ogImage],
    },
  };
}

/** Site-wide company identity, emitted once from the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Brit Soap Machinery Pvt. Ltd.",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  description:
    "Manufacturer of complete soap production plants and soap making machinery, from saponification to finishing, cutting and stamping.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit No 12, Kotkar Industrial Estate, Off Aarey Road",
    addressLocality: "Goregaon East, Mumbai",
    postalCode: "400063",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-22-28685199",
      contactType: "sales",
      email: "britsoap@gmail.com",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://www.indiamart.com/britsoapmachinery/",
    "https://www.youtube.com/user/BritsoapMachinery",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Breadcrumb trail; pass items in order, root first. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Product schema for a machine page. */
export function productSchema({
  name,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripBrandSuffix(name),
    description: clampDescription(description, 300),
    image: absoluteUrl(image),
    url: absoluteUrl(path),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    category: "Soap Manufacturing Machinery",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      price: "0",
      priceValidUntil: "2030-12-31",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

/** FAQ schema; only emit when the questions are visible on the page. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
