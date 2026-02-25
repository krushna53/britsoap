import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const locales = ["en", "hi", "zh", "ar", "fr"];

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

  // Already has lang
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}`)
  );

  if (pathnameHasLocale) return;

  // 🌍 Detect country
  const country = request.geo?.country || "IN";

  let locale = "en";

  if (country === "IN") locale = "hi";
  if (country === "CN") locale = "zh";
  if (country === "FR") locale = "fr";
  if (country === "AE") locale = "ar";

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}