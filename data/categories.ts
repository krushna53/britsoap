import { productPages } from "./productPages";

type LocalProduct = {
  slug: string;
  title: string;
  description: string;
  detailSection?: {
    images?: string[];
  };
  comingSoon?: boolean;
};

type LocalCategory = {
  title: string;
  slug: string;
  description: string;
  intro: string[];
  introImage: string;
  products: string[];
};

export const categories = [
  {
    title: "Soap Stampers",
    slug: "soap-stampers",
    description:
      "Precision soap stamping systems for clean embossing, uniform bar shape, and reliable high-speed finishing.",
    intro: [
      "Soap stamping is a key stage in the finishing line where refined billets are transformed into uniform branded bars with sharp embossing and superior visual appeal.",
      "Our stamper range supports artisanal to high-capacity automated production, with dedicated models for toilet soaps, laundry bars, and six-face premium formats.",
    ],
    introImage: "/category-media/soap-stampers/overview.jpeg",
    products: [
      "manual-pneumatic-soap-stamper",
      "hrd-soap-stamper",
      "rotary-soap-stamper",
      "vertical-soap-stamper",
      "six-face-soap-stamper",
      "laundry-soap-stamper",
    ],
  },
  {
    title: "Soponification",
    slug: "soponification",
    description:
      "Soap reaction systems that convert oils and caustic soda into neat soap for industrial soap manufacturing.",
    intro: [
      "The saponification process in soap manufacturing is the first and most critical stage of industrial soap production, where oils and fats such as palm oil react with caustic soda (alkali) under controlled temperature and mixing conditions to produce a liquid soap base known as neat soap.",
      "This chemical reaction determines the overall quality, consistency, and performance of the final product. The neat soap is then transferred to a soap drying plant, where moisture is removed to form soap noodles, which serve as the base for toilet soap, laundry soap, and specialty soap bar production through further refining, extrusion, cutting, and stamping processes.",
    ],
    introImage: "/category-media/soponification/overview.png",
    products: ["saponification-crutcher", "saponification-jet"],
  },
  {
    title: "Refining & Plodding",
    slug: "refining-and-plodding",
    description: "High-performance machines designed for refining and homogenizing soap mass.",
    intro: [
      "Refining and plodding improve texture, remove air pockets, and prepare soap mass for accurate cutting and stamping.",
      "Our simplex, duplex, and milling systems are built for stable throughput and uniform product finish across production sizes.",
    ],
    introImage: "/assets/product-finishing.jpg",
    products: [
      "simplex-refiner-plodder",
      "duplex-vacuum-soap-plodder-machine",
      "triple-roll-mill-soap-refining-machine",
    ],
  },
  {
    title: "Finishing Line",
    slug: "finishing-line",
    description:
      "Integrated finishing systems for mixing, refining, extrusion, cutting, and stamping of premium soap bars.",
    intro: [
      "The soap finishing line is the final and most quality-critical stage where soap mass is transformed into smooth, refined, and precisely shaped bars ready for packaging.",
      "By combining mixing, milling, plodding, cutting, and stamping equipment, the line ensures consistent appearance, structural integrity, and strong brand identity.",
    ],
    introImage: "/category-media/finishing-line/overview.jpg",
    products: [
      "double-arm-sigma-mixer-soap-manufacturing",
      "triple-roll-mill-soap-refining-machine",
      "simplex-refiner-plodder",
      "duplex-vacuum-soap-plodder-machine",
      "soap-cutters",
      "soap-stampers-overview",
    ],
  },
  {
    title: "Dryling Line",
    slug: "dryling-line",
    description:
      "High-efficiency vacuum spray drying systems for converting liquid neat soap into dried solid soap.",
    intro: [
      "The drying line converts liquid neat soap into solid soap under controlled vacuum spray conditions, delivering consistent moisture removal and stable product quality.",
      "Our integrated setup combines heat exchange, atomisation, vacuum generation, and particle separation for reliable and energy-efficient high-capacity production.",
    ],
    introImage: "/category-media/dryling-line/overview.png",
    products: [
      "soap-heat-exchanger",
      "powder-separator",
      "vacuum-drying-system",
      "soap-atomiser",
    ],
  },
] as LocalCategory[];

const localProducts: Record<string, LocalProduct> = {
  "manual-pneumatic-soap-stamper": {
    slug: "manual-pneumatic-soap-stamper",
    title: "Manual Pneumatic Soap Stamper",
    description:
      "Compact single-cavity stamper for low-capacity production, pilot runs, and artisanal soap finishing with reliable embossing quality.",
    detailSection: { images: ["/category-media/soap-stampers/manual-stamper.png"] },
    comingSoon: true,
  },
  "hrd-soap-stamper": {
    slug: "hrd-soap-stamper",
    title: "HRD Soap Stamper",
    description:
      "Integrated cutting and stamping machine for continuous billets with stable bar definition and quick die changeover.",
    detailSection: { images: ["/category-media/soap-stampers/hrd-stamper.png"] },
    comingSoon: true,
  },
  "rotary-soap-stamper": {
    slug: "rotary-soap-stamper",
    title: "Rotary Soap Stamper",
    description:
      "High-speed automatic stamper with rotary mandrel and de-flashing support for continuous production lines.",
    detailSection: { images: ["/category-media/soap-stampers/rotary-stamper.png"] },
    comingSoon: true,
  },
  "vertical-soap-stamper": {
    slug: "vertical-soap-stamper",
    title: "Vertical Soap Stamper",
    description:
      "Precision vertical stamping system with vacuum handling and reduced scrap for advanced finishing lines.",
    detailSection: { images: ["/category-media/soap-stampers/vertical-stamper.png"] },
    comingSoon: true,
  },
  "six-face-soap-stamper": {
    slug: "six-face-soap-stamper",
    title: "6 Face Soap Stamper",
    description:
      "Fully automatic six-side stamping machine for cuboid and rectangular soaps with premium all-face embossing.",
    detailSection: { images: ["/category-media/soap-stampers/six-face-stamper.png"] },
    comingSoon: true,
  },
  "laundry-soap-stamper": {
    slug: "laundry-soap-stamper",
    title: "Laundry Soap Stamper",
    description:
      "Dual-side rotary stamper designed for high-volume rectangular laundry bars with consistent geometry and branding.",
    detailSection: { images: ["/category-media/soap-stampers/laundry-stamper.png"] },
    comingSoon: true,
  },
  "saponification-crutcher": {
    slug: "saponification-crutcher-soap-manufacturing",
    title: "Saponification Crutcher",
    description:
      "The Saponification Crutcher is a batch-type soap reaction vessel used in the semi-boiled soap process, designed for controlled mixing of fatty acids, caustic soda, brine, and water to produce neat soap with consistent quality.",
    detailSection: { images: ["/category-media/soponification/crutcher.png"] },
    comingSoon: true,
  },
  "saponification-jet": {
    slug: "saponification-jet",
    title: "Saponification Jet",
    description:
      "The Saponification Jet is a continuous soap manufacturing system that uses steam-driven venturi technology to enable instant saponification, producing up to 90% reacted neat soap directly.",
    detailSection: { images: ["/category-media/soponification/jet.png"] },
    comingSoon: true,
  },
  "soap-heat-exchanger": {
    slug: "soap-heat-exchanger",
    title: "Heat Exchanger",
    description:
      "Steam-heated exchanger for precise liquid soap preheating before vacuum spray drying to improve evaporation efficiency.",
    detailSection: { images: ["/category-media/dryling-line/heat-exchanger.jpg"] },
    comingSoon: true,
  },
  "powder-separator": {
    slug: "powder-separator",
    title: "Powder Separator",
    description:
      "Cyclone separator system that removes fine soap particles from exhaust gases to protect downstream systems.",
    detailSection: { images: ["/category-media/dryling-line/powder-separator.png"] },
    comingSoon: true,
  },
  "vacuum-drying-system": {
    slug: "vacuum-drying-system",
    title: "Vacuum Drying System",
    description:
      "Integrated booster, condenser, and vacuum pump arrangement for stable vacuum levels and efficient moisture removal.",
    detailSection: { images: ["/category-media/dryling-line/vacuum-system.png"] },
    comingSoon: true,
  },
  "soap-atomiser": {
    slug: "soap-atomiser",
    title: "Atomiser / Vacuum Spray Chamber",
    description:
      "Vacuum spray chamber for rapid transformation of liquid neat soap into dried solid form with uniform quality.",
    detailSection: { images: ["/category-media/dryling-line/atomiser.png"] },
    comingSoon: true,
  },
  "soap-stampers-overview": {
    slug: "soap-stampers-overview",
    title: "Soap Press / Soap Stampers",
    description:
      "Stamping systems that shape, compress, and emboss soap bars to deliver finished geometry and brand identity.",
    detailSection: { images: ["/category-media/soap-stampers/overview.jpeg"] },
    comingSoon: true,
  },
  "soap-cutters": {
    slug: "soap-cutters",
    title: "Soap Cutters Overview",
    description:
      "Automated cutting machines for uniform bar length and reduced wastage across continuous soap finishing lines.",
    detailSection: {
      images: ["/category-media/finishing-line/soap-cutters.png"],
    },
  },
};

export const getLocalCategoryWithProducts = (slug: string) => {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return null;

  const products = category.products
    .map((productSlug) => {
      const localProduct = localProducts[productSlug];
      if (localProduct) return localProduct;
      return productPages.find((p) => p.slug === productSlug);
    })
    .filter(Boolean);

  return {
    ...category,
    products,
  };
};
