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
    title: "Soap Stamping Machines | Precision Soap Finishing for High-Quality Bar Production",
    slug: "soap-stampers",
    description:
      "Enhancing Shape, Branding & Finish in Soap Manufacturing",
    intro: [
      "Soap stamping is a critical stage in the soap finishing line, where refined soap billets are transformed into uniform, branded soap bars with precise shape, smooth surface, and sharp embossing. This process involves compressing and moulding soap under controlled pressure using precision dies, ensuring consistency in weight, appearance, and product identity.",
      "Beyond aesthetics, soap stamping plays a key role in product differentiation, brand recall, and packaging readiness, making it an essential step for both toilet soaps and laundry soaps. Modern soap stamping machines are designed to deliver high efficiency, repeatability, and flexibility, catering to a wide range of production capacities - from small-scale artisanal setups to fully automated industrial lines.",
      "At Brit Soap Machinery, we offer a comprehensive range of soap stamping solutions, each engineered for specific production needs, automation levels, and soap formats.",
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
    title: "Saponification Process | Soap Reaction System for Neat Soap Production",
    slug: "saponification",
    description:
      "Efficient conversion of oils and caustic soda into neat soap for industrial soap manufacturing.",
    intro: [
      "The saponification process in soap manufacturing is the first and most critical stage of industrial soap production, where oils and fats such as palm oil react with caustic soda (alkali) under controlled temperature and mixing conditions to produce a liquid soap base known as neat soap. This chemical reaction (saponification) determines the overall quality, consistency, and performance of the final product. The neat soap is then transferred to a soap drying plant, where moisture is removed to form soap noodles, which serve as the base for toilet soap, laundry soap, and specialty soap bar production through further refining, extrusion, cutting, and stamping processes.",
    ],
    introImage: "/category-media/saponification/overview.png",
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
    title: "Advanced Soap Drying Line System",
    slug: "drying-line",
    description:
      "High-efficiency drying process designed to convert liquid soap into solid form with precise moisture control and consistent product quality.",
    intro: [
      "The soap drying line is a critical stage in soap manufacturing where liquid neat soap is transformed into dried, solid soap through a controlled vacuum spray drying process. By combining advanced equipment such as the atomiser, vacuum generating system, and powder separators, the process ensures rapid moisture evaporation, uniform drying, and efficient material handling.",
      "This integrated system enhances product consistency, improves energy efficiency, and enables seamless operation across modern high-capacity soap production lines.",
    ],
    introImage: "/category-media/drying-line/overview.png",
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
    title: "Manual Pneumatic Stamper",
    description:
      "A compact manual soap stamping machine designed for low-capacity production, pilot batches, and artisanal soap makers. It offers precise embossing with a pneumatically assisted mechanism, making it ideal for small-scale manufacturers and customised soap runs.",
    detailSection: { images: ["/category-media/soap-stampers/manual-stamper.png"] },
    comingSoon: true,
  },
  "hrd-soap-stamper": {
    slug: "hrd-soap-stamper",
    title: "HRD Stamper",
    description:
      "A robust heavy-duty soap stamper built for medium-capacity production, delivering consistent output with enhanced durability. Best suited for manufacturers looking for a balance between manual control and higher productivity.",
    detailSection: { images: ["/assets/HRDStamper/soap-stamping-machine.png"] },
    comingSoon: true,
  },
  "rotary-soap-stamper": {
    slug: "rotary-soap-stamper",
    title: "Rotary Stamper",
    description:
      "A high-speed rotary stamping machine designed for continuous soap production lines, capable of delivering high output with uniform quality. Ideal for large-scale manufacturers requiring efficiency, automation, and consistent branding.",
    detailSection: { images: ["/category-media/soap-stampers/rotary-stamper.png"] },
    comingSoon: true,
  },
  "vertical-soap-stamper": {
    slug: "vertical-soap-stamper",
    title: "Vertical Stamper",
    description:
      "An advanced vertical stamping system engineered for precision alignment and superior surface finish, especially for premium soap bars. Suitable for high-end toilet soap production and automated finishing lines.",
    detailSection: { images: ["/assets/VerticalStamper/automatic-soap-stamping-machine.png"] },
    comingSoon: true,
  },
  "six-face-soap-stamper": {
    slug: "six-face-soap-stamper",
    title: "6 Face Stamper",
    description:
      "A specialised six-side stamping machine that stamps all faces of cuboid or Marseille-type soaps, ensuring complete branding and uniform geometry. Ideal for premium, export-quality, and traditional soap formats.",
    detailSection: { images: ["/assets/SixFaceStamper/soap-stamper-cuboid-six-side-stamper.png"] },
    comingSoon: true,
  },
  "laundry-soap-stamper": {
    slug: "laundry-soap-stamper",
    title: "Laundry Stamper",
    description:
      "A purpose-built soap stamper for rectangular laundry bars, capable of stamping multiple faces efficiently. Best suited for high-volume laundry soap production with consistent shape and automated finishing lines.",
    detailSection: { images: ["/assets/LaundryStamper/laundry-soap-syamper.png"] },
    comingSoon: true,
  },
  "saponification-crutcher": {
    slug: "saponification-crutcher-soap-manufacturing",
    title: "Saponification Crutcher",
    description:
      "The Saponification Crutcher is a batch-type soap reaction vessel used in the semi-boiled soap process, designed for controlled mixing of fatty acids, caustic soda, brine, and water to produce neat soap with consistent quality. It is ideal for manufacturers requiring flexibility in formulations, offering precise control over reaction parameters and uniform soap production.",
    detailSection: { images: ["/category-media/saponification/crutcher.png"] },
    comingSoon: true,
  },
  "saponification-jet": {
    slug: "saponification-jet",
    title: "Saponification Jet",
    description:
      "The Saponification Jet is a continuous soap manufacturing system that uses steam-driven venturi technology to enable instant saponification, producing up to 90% reacted neat soap directly. With no moving parts and low steam consumption, it is ideal for high-capacity soap plants seeking energy-efficient, low-maintenance, and high-speed production.",
    detailSection: { images: ["/category-media/saponification/jet.png"] },
    comingSoon: true,
  },
  "soap-heat-exchanger": {
    slug: "soap-heat-exchanger",
    title: "Heat Exchanger",
    description:
      "The heat exchanger raises the temperature of liquid soap before it enters the vacuum spray chamber, enabling effective evaporation of excess moisture during the drying process. This controlled heating ensures consistent drying performance, improved efficiency, and uniform final soap quality.",
    detailSection: { images: ["/category-media/drying-line/heat-exchanger.jpg"] },
    comingSoon: true,
  },
  "powder-separator": {
    slug: "powder-separator",
    title: "Powder Separators",
    description:
      "The powder separators remove fine soap particles from exhaust gases leaving the vacuum spray chamber, ensuring clean gas flow and preventing contamination of downstream systems. This improves plant efficiency, protects the condenser system, and supports better effluent management.",
    detailSection: { images: ["/category-media/drying-line/powder-separator.png"] },
    comingSoon: true,
  },
  "vacuum-drying-system": {
    slug: "vacuum-drying-system",
    title: "Vacuum Drying System",
    description:
      "The vacuum spray drying system, including the vacuum booster, condenser, and vacuum pump, creates and maintains optimal vacuum conditions for efficient moisture evaporation. It enhances drying performance, reduces energy consumption, and ensures stable, continuous plant operation.",
    detailSection: { images: ["/category-media/drying-line/vacuum-system.png"] },
    comingSoon: true,
  },
  "soap-atomiser": {
    slug: "soap-atomiser",
    title: "Atomiser / Vacuum Spray Chamber",
    description:
      "The atomiser / vacuum spray chamber converts liquid soap into dried, solid form within seconds by spraying it under controlled vacuum conditions. This ensures uniform drying, consistent quality, and smooth integration with refining or plodding equipment.",
    detailSection: {
      images: ["/assets/DryingLine/soap-atomiser-vacuum-spray-chamber.png"],
    },
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
