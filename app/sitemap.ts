import type { MetadataRoute } from "next";

const BASE_URL = "https://britsoap.netlify.app";
const langs = ["en", "fr", "es"];

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/contact",
  "/soap-cutters",
];

const categoryRoutes = [
  "/products/saponification",
  "/products/drying-line",
  "/products/soap-stampers",
  "/products/finishing-line",
];

const productRoutes = [
  "/products/saponification/saponification-crutcher-soap-manufacturing",
  "/products/saponification/saponification-jet",
  "/products/drying-line/soap-heat-exchanger",
  "/products/drying-line/powder-separator",
  "/products/drying-line/vacuum-drying-system",
  "/products/drying-line/soap-atomiser",
  "/products/soap-stampers/manual-pneumatic-soap-stamper",
  "/products/soap-stampers/hrd-soap-stamper",
  "/products/soap-stampers/rotary-soap-stamper",
  "/products/soap-stampers/vertical-soap-stamper",
  "/products/soap-stampers/six-face-soap-stamper",
  "/products/soap-stampers/laundry-soap-stamper",
];

const rootProductRoutes = [
  "/double-arm-sigma-mixer-soap-manufacturing",
  "/triple-roll-mill-soap-refining-machine",
  "/simplex-refiner-plodder",
  "/duplex-vacuum-soap-plodder-machine",
  "/av-pneumatic-soap-cutter-machine",
  "/high-speed-soap-cutter-machine",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const allRoutes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...rootProductRoutes,
  ];

  for (const lang of langs) {
    for (const route of allRoutes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.includes("/products/") && !route.includes("/products/saponification") && !route.includes("/products/drying-line") && !route.includes("/products/soap-stampers") && !route.includes("/products/finishing-line") ? 0.8 : 0.7,
      });
    }
  }

  return entries;
}
