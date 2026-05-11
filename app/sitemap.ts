import type { MetadataRoute } from "next";
import { productPages } from "@/data/productPages";
import { categories } from "@/data/categories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://britsoap.netlify.app";

const rootSlugs = [
  "av-pneumatic-soap-cutter-machine",
  "double-arm-sigma-mixer-soap-manufacturing",
  "duplex-vacuum-soap-plodder-machine",
  "high-speed-soap-cutter-machine",
  "simplex-refiner-plodder",
  "triple-roll-mill-soap-refining-machine",
];

function buildRoutes() {
  const routes = new Set<string>();

  // Static pages
  ["", "/about", "/services", "/contact", "/soap-cutters"].forEach((r) =>
    routes.add(r)
  );

  // Category pages from data/categories
  categories.forEach((cat) => routes.add(`/products/${cat.slug}`));

  // Products defined in categories.localProducts and productPages
  categories.forEach((cat) => {
    cat.products.forEach((p) => {
      if (rootSlugs.includes(p)) {
        routes.add(`/${p}`);
      } else {
        routes.add(`/products/${cat.slug}/${p}`);
      }
    });
  });

  // Also include any productPages that might not be listed in categories
  productPages.forEach((p) => {
    if (rootSlugs.includes(p.slug)) {
      routes.add(`/${p.slug}`);
    } else {
      // try to find a category that contains this product
      const cat = categories.find((c) => c.products.includes(p.slug));
      if (cat) routes.add(`/products/${cat.slug}/${p.slug}`);
      else routes.add(`/products/${p.slug}`);
    }
  });

  return Array.from(routes);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const routes = buildRoutes();

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : route.includes("/products/") ? 0.7 : 0.8,
    });
  }

  return entries;
}
