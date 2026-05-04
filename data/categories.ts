import { productPages } from "./productPages";

export const categories = [
  {
    title: "Mixing Equipment",
    slug: "mixing-equipment",
    description: "Explore our range of mixing equipment for optimal soap manufacturing.",
    products: ["double-arm-sigma-mixer-soap-manufacturing"]
  },
  {
    title: "Refining & Plodding",
    slug: "refining-and-plodding",
    description: "High-performance machines designed for refining and homogenizing soap mass.",
    products: ["simplex-refiner-plodder", "duplex-vacuum-soap-plodder-machine", "triple-roll-mill-soap-refining-machine"]
  },
  {
    title: "Finishing Line",
    slug: "finishing-line",
    description: "Precision cutting and stamping machines for the perfect soap bar finish.",
    products: ["soap-cutters", "av-pneumatic-soap-cutter-machine", "high-speed-soap-cutter-machine"]
  }
];

export const getLocalCategoryWithProducts = (slug: string) => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;

  const products = category.products.map(productSlug => {
    if (productSlug === "soap-cutters") {
      return {
        slug: "soap-cutters",
        title: "Soap Cutters Overview",
        description: "Explore our range of automatic soap cutters for consistent soap manufacturing.",
        detailSection: {
          images: ["/assets/AVC/automatic-soap-cutting-machine.png"]
        }
      };
    }
    return productPages.find(p => p.slug === productSlug);
  }).filter(Boolean);

  return {
    ...category,
    products
  };
};
