import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const locales = ["en", "fr", "es"] as const;
type Locale = (typeof locales)[number];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Already has locale
  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  if (pathnameHasLocale) return;

  // 🌍 Detect country
const country = (request as any).geo?.country || "IN";

  // ✅ Mapping
  const countryToLocale: Record<string, Locale> = {
    IN: "en",
    FR: "fr",
    ES: "es",
    MX: "es",
    AR: "es",
  };

  const locale: Locale = countryToLocale[country] || "en";

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}