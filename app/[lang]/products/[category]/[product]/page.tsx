import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Script from "next/script";
import Layout from "@/components/Layout";
import { getCategoryWithProducts } from "@/lib/contentful";
import { getLocalCategoryWithProducts } from "@/data/categories";
import ProductHero from "@/components/ProductHero";
import RefinerIntro from "@/components/RefinerIntro";
import Section from "@/components/Section";
import Grid from "@/components/Grid";
import ImportanceGrid from "@/components/ImportanceGrid";
import CapacityRange from "@/components/CapacityRange";
import CTASection from "@/components/CTASection";

type Product = {
  name: string;
  slug: string;
  shortDescription: string;
  imageUrl: string | null;
  order: number;
};

type LocalProductPageData = {
  title: string;
  description: string;
  video: string;
  introTitle: string;
  introParagraphs: string[];
  processTitle: string;
  processSteps: { desc: string; image: string }[];
  importanceTitle: string;
  importanceDescription: string;
  importanceItems: string[];
  detailTitle: string;
  detailParagraphs: string[];
  detailImage: string;
  applicationTitle: string;
  applicationDescription: string;
  capacities: string[];
};

const DEFAULT_VIDEO = "/assets/Mixer/double-arm-sigma-soap-mixer.mov";

type ProductSeoData = {
  title: string;
  description: string;
  keywords: string[];
  imageAlt?: string;
};

const LOCAL_PRODUCT_SEO: Record<string, ProductSeoData> = {
  "manual-pneumatic-soap-stamper": {
    title: "Manual Pneumatic Soap Stamper | Compact Soap Finishing Machine for Precision Stamping",
    description:
      "Manual pneumatic soap stamper for precise, low-capacity soap finishing. Single-cavity pneumatic stamping machine for toilet and laundry soaps, pilot batches, and custom runs.",
    keywords: [
      "manual pneumatic soap stamper",
      "soap stamping machine",
      "soap finishing machine",
      "manual soap stamper",
      "pneumatic soap stamper",
      "single cavity soap stamper",
      "soap embossing machine",
      "toilet soap stamper",
      "laundry soap stamper",
      "compact soap stamping machine",
      "manual soap stamping machine for small scale production",
      "low capacity soap finishing machine",
      "pneumatic soap stamper with safety door",
      "soap embossing machine for banded and bandless soaps",
      "cost effective soap stamper for small manufacturers",
      "pneumatic stamping mechanism",
      "single die soap press",
      "brass soap dies anti stick coating",
      "manual lever soap stamping system",
      "soap compression and embossing machine",
      "soap manufacturing equipment",
      "soap finishing line machinery",
      "small scale soap production machine",
      "artisanal soap equipment",
      "pilot batch soap machinery",
      "soap branding machine",
      "soap logo embossing machine",
      "small batch soap stamper",
      "custom soap production equipment",
      "low volume soap manufacturing",
    ],
  },
  "hrd-soap-stamper": {
    title: "HRD Soap Stamper for Continuous Soap Cutting and Stamping",
    description:
      "Integrated soap cutting and stamping machine for continuous plodder output. Ensures consistent bar shape, smooth finish, and flexible die configurations.",
    keywords: [
      "soap stamper machine",
      "soap stamping machine",
      "soap cutting and stamping machine",
      "toilet soap stamper",
      "soap bar stamper",
      "automatic soap stamper",
      "soap bar stamping machine",
      "soap finishing machine",
      "soap press machine",
      "industrial soap stamper",
      "soap cutting and stamping machine for soap manufacturing",
      "2 in 1 soap stamper machine",
      "continuous soap bar stamping machine",
      "toilet soap stamping machine with cutter",
      "soap plodder line stamper",
    ],
    imageAlt: "HRD soap stamper cutting and stamping continuous soap bars",
  },
  "rotary-soap-stamper": {
    title: "Rotary Soap Stamper Machine for Continuous Soap Bar Finishing",
    description:
      "Automatic rotary soap stamper for shaping, embossing and finishing soap bars. Designed for continuous production lines with consistent output. Contact our team today.",
    keywords: [
      "rotary soap stamper",
      "soap stamper machine",
      "automatic soap stamping machine",
      "soap stamping machine",
      "soap bar stamping machine",
      "soap finishing machine",
      "soap die press machine",
      "industrial soap stamper",
      "soap pressing machine",
      "rotary soap stamper machine for soap manufacturing",
      "automatic soap stamping machine for continuous production",
      "soap bar shaping and stamping machine",
      "industrial soap finishing machine with conveyor",
      "soap die stamping machine with vacuum de-flashing",
    ],
    imageAlt: "Rotary soap stamper machine shaping and finishing soap bars",
  },
  "soap-heat-exchanger": {
    title: "Industrial Heat Exchanger for Soap Drying Lines | Brit Soap Machinery",
    description:
      "High-performance heat exchanger for liquid soap heating, ensuring efficient moisture evaporation and consistent drying in soap manufacturing plants.",
    keywords: [
      "soap heat exchanger",
      "industrial heat exchanger",
      "soap drying equipment",
      "liquid soap heating system",
      "steam heat exchanger",
      "moisture evaporation system",
      "soap drying line machinery",
      "soap manufacturing equipment",
      "spray drying plant soap",
      "industrial soap processing machinery",
      "vacuum drying system",
      "soap finishing line equipment",
      "soap plant engineering",
      "soap production machine manufacturer",
      "industrial soap machinery India",
      "soap processing plant equipment",
    ],
  },
  "powder-separator": {
    title: "Powder Separator for Soap Plants | Cyclone Dust Removal System",
    description:
      "Efficient cyclone powder separators for removing fine soap dust from vacuum spray chamber gases and improving plant efficiency.",
    keywords: [
      "powder separator soap",
      "cyclone separator",
      "soap dust removal system",
      "vacuum spray chamber separator",
      "industrial dust collector",
      "soap plant filtration",
      "soap drying line machinery",
      "soap manufacturing equipment",
      "spray drying plant soap",
      "industrial soap processing machinery",
      "vacuum drying system",
      "soap finishing line equipment",
      "soap plant engineering",
      "soap production machine manufacturer",
      "industrial soap machinery India",
      "soap processing plant equipment",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; product: string }>;
}): Promise<Metadata> {
  const { lang, category, product } = await params;
  const seo = LOCAL_PRODUCT_SEO[product];

  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${lang}/products/${category}/${product}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `/${lang}/products/${category}/${product}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

const LOCAL_PRODUCT_PAGES: Record<string, LocalProductPageData> = {
  "saponification-crutcher-soap-manufacturing": {
    title: "Saponification Crutcher",
    description:
      "Batch-type soap reaction vessel for controlled semi-boiled soap production with flexible formulation control.",
    video: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
    introTitle: "Controlled Batch Saponification For Consistent Neat Soap",
    introParagraphs: [
      "The Saponification Crutcher is a batch-type soap reaction vessel used in the semi-boiled soap process for controlled mixing of fatty acids, caustic soda, brine, and water.",
      "It is designed for manufacturers who need precise reaction control, consistent neat soap quality, and flexibility for different soap formulations and additive blending.",
    ],
    processTitle: "The Saponification Crutcher Process",
    processSteps: [
      {
        desc: "Raw materials are charged into the vessel with accurate dosing of fatty acids, caustic liquor, brine, and water.",
        image: "/assets/SaponificationCrutcher/neat-soap-production.jpeg",
      },
      {
        desc: "The agitator maintains uniform mixing through the reaction stage to complete saponification.",
        image: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
      },
      {
        desc: "Neat soap is discharged for downstream drying and finishing operations after the batch cycle is complete.",
        image: "/assets/SaponificationCrutcher/soap-from-oil-caustic.JPG",
      },
    ],
    importanceTitle: "Why Saponification Control Matters",
    importanceDescription:
      "Saponification determines the base quality of every soap bar. Stable reaction control improves downstream drying, refining, and final product consistency.",
    importanceItems: [
      "Consistent neat soap quality",
      "Better control over formulation variability",
      "Improved downstream drying performance",
      "Reduced batch-to-batch quality deviation",
    ],
    detailTitle: "Brit Soap Saponification Crutcher",
    detailParagraphs: [
      "The crutcher is the primary reaction vessel in the semi-boiled soap process and is designed to produce neat soap with consistent quality.",
      "A typical cycle is organized around charging, a controlled saponification reaction, and discharge, with an overall cycle time of about two hours.",
      "Critical parameters such as pump ratings, saponification value, caustic liquor concentration, and reaction temperature directly affect batch performance and quality.",
    ],
    detailImage: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used in industrial soap plants requiring controlled batch saponification, recipe flexibility, and stable neat soap output for downstream drying and finishing lines.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "saponification-jet": {
    title: "Saponification Jet | Instant Soap Making System with Venturi Technology",
    description:
      "High-efficiency instant saponification system using steam-driven venturi technology for continuous soap production",
    video: "/assets/SaponificationJet/saponification-jet-soap.png",
    introTitle: "Instant Continuous Saponification Using Venturi Steam Technology",
    introParagraphs: [
      "The Saponification Jet is an advanced, no-moving-parts system designed for instant soap production using steam energy. Utilizing venturi vacuum technology, it enables rapid mixing of caustic liquor and oils, delivering up to 90% reacted neat soap directly from the unit.",
      "Ideal for high-capacity, continuous soap manufacturing lines.",
    ],
    processTitle: "The Saponification Jet Process",
    processSteps: [
      {
        desc: "Motive steam passes through the venturi section to generate suction and controlled vacuum.",
        image: "/assets/SaponificationJet/saponification-jet-soap.png",
      },
      {
        desc: "Caustic liquor and oil streams are drawn into concentric barrels with adjustable needle valve control.",
        image: "/assets/SaponificationJet/venturi-system-soap-reactor.jpg",
      },
      {
        desc: "Instant saponification occurs and high-reacted neat soap is discharged directly for further processing.",
        image: "/assets/SaponificationJet/saponification-jet-soap.png",
      },
    ],
    importanceTitle: "Why Jet Saponification Is Effective",
    importanceDescription:
      "Continuous jet saponification reduces reaction time while maintaining stable output quality across higher production rates.",
    importanceItems: [
      "Enables instant soap production, reducing processing time",
      "Improves energy efficiency with low steam consumption",
      "Ensures consistent and uniform saponification",
      "Reduces mechanical wear due to no moving parts",
      "Supports scalable production from 1 to 10 TPH",
      "Minimizes maintenance and operational downtime",
      "Delivers high conversion efficiency (up to 90% neat soap)",
    ],
    detailTitle: "Brit Soap Saponification Jet",
    detailParagraphs: [
      "The Saponification Jet is a highly efficient instant saponification device used in modern industrial soap manufacturing, designed to operate without any moving parts.",
      "It utilizes motive steam as the primary energy source, ensuring low maintenance and reliable performance. The system requires only 100 kg of steam per tonne of soap, making it an energy-efficient solution for continuous soap production.",
      "A single jet unit can be adjusted to handle soap output capacities ranging from 1 to 10 tonnes per hour, offering flexibility across different plant scales. The jet operates by passing 5 bar motive steam through an internal venturi, creating a strong vacuum.",
      "This vacuum enables precise and controlled suction of raw materials. The venturi steam jet is equipped with a needle valve, allowing operators to regulate flow rate, suction volume, and overall production output.",
      "Surrounding the steam jet are two concentric barrels designed for caustic liquor (alkali) and oils/fatty materials. The venturi-induced vacuum draws both streams into the mixing zone, where they interact in the presence of steam, resulting in instantaneous saponification and producing up to 90% reacted neat soap.",
    ],
    detailImage: "/assets/SaponificationJet/saponification-jet-soap.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Ideal for continuous soap manufacturing lines where high output, consistent reaction quality, low steam use, and low-maintenance operation are required.",
    capacities: ["1 ton/hr", "2 tons/hr", "4 tons/hr", "6 tons/hr", "10 tons/hr"],
  },
  "soap-heat-exchanger": {
    title: "Heat Exchanger",
    description:
      "Industrial heat exchanger for controlled liquid soap heating before vacuum spray drying.",
    video: DEFAULT_VIDEO,
    introTitle: "Stable Preheating For Efficient Soap Drying",
    introParagraphs: [
      "The heat exchanger raises liquid soap temperature before atomisation, helping excess moisture evaporate effectively inside the vacuum drying chamber.",
      "Controlled thermal transfer improves drying stability, energy efficiency, and final soap consistency.",
    ],
    processTitle: "Heat Exchanger In Drying Line Flow",
    processSteps: [
      {
        desc: "Liquid soap is pumped through multiple tube paths for high surface-area heat transfer.",
        image: "/category-media/dryling-line/heat-exchanger.jpg",
      },
      {
        desc: "Steam heats the external shell side to raise process temperature in a controlled manner.",
        image: "/category-media/dryling-line/overview.png",
      },
      {
        desc: "Preheated soap is transferred to the atomiser for rapid vacuum drying.",
        image: "/category-media/dryling-line/atomiser.png",
      },
    ],
    importanceTitle: "Why Controlled Heating Is Important",
    importanceDescription:
      "Preheating directly impacts moisture evaporation rate and overall drying efficiency in continuous soap production.",
    importanceItems: [
      "Improves downstream drying efficiency",
      "Enhances moisture control consistency",
      "Supports stable continuous operation",
      "Reduces process variability and rework",
    ],
    detailTitle: "Brit Soap Heat Exchanger",
    detailParagraphs: [
      "Engineered for continuous operation, the unit is designed for controlled steam heating and reliable thermal performance.",
      "Multi-tube construction improves exchange area and enables efficient process control under plant load variations.",
      "Industrial-grade materials and pressure-tested build quality support long service life in demanding soap plants.",
    ],
    detailImage: "/category-media/dryling-line/heat-exchanger.jpg",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used in integrated soap drying systems where reliable preheating is required for efficient moisture evaporation and consistent process output.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "powder-separator": {
    title: "Powder Separator",
    description:
      "Cyclone-based powder separation unit for removing soap fines from drying line exhaust gases.",
    video: DEFAULT_VIDEO,
    introTitle: "Efficient Soap Dust Separation For Cleaner Drying Operation",
    introParagraphs: [
      "Powder separators remove fine soap particles from gases exiting the vacuum spray chamber, protecting downstream systems and condenser performance.",
      "The setup improves operational reliability, effluent quality control, and overall plant cleanliness.",
    ],
    processTitle: "Powder Separation Process",
    processSteps: [
      {
        desc: "Particle-laden gases enter the cyclone chamber from the drying line.",
        image: "/category-media/dryling-line/powder-separator.png",
      },
      {
        desc: "Cyclone motion separates fine soap dust from gas stream flow.",
        image: "/category-media/dryling-line/overview.png",
      },
      {
        desc: "Collected powder is discharged through catch pots while cleaned gases continue downstream.",
        image: "/category-media/dryling-line/vacuum-system.png",
      },
    ],
    importanceTitle: "Why Powder Separation Is Important",
    importanceDescription:
      "Dust control protects process equipment and supports stable continuous operation with cleaner exhaust handling.",
    importanceItems: [
      "Prevents carryover into condenser system",
      "Improves plant cleanliness and reliability",
      "Supports smoother wastewater management",
      "Reduces contamination-related disruptions",
    ],
    detailTitle: "Brit Soap Powder Separators",
    detailParagraphs: [
      "The cyclone separator system is engineered for continuous industrial duty and efficient fine particle removal.",
      "Catch-pot and isolation arrangements support maintenance without major process interruption.",
      "Material options are available based on application, durability, and corrosion requirements.",
    ],
    detailImage: "/category-media/dryling-line/powder-separator.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Ideal for vacuum spray drying plants and integrated soap processing lines requiring robust dust and fine-particle control.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "vacuum-drying-system": {
    title: "Vacuum Drying System",
    description:
      "Integrated vacuum booster, condenser, and pump system for efficient moisture removal in soap drying lines.",
    video: DEFAULT_VIDEO,
    introTitle: "Integrated Vacuum Generation For Stable Drying Performance",
    introParagraphs: [
      "The vacuum generating system creates and maintains the required vacuum conditions in spray drying plants for effective moisture evaporation.",
      "By combining booster, condenser, and vacuum pump functions, it improves drying efficiency and lowers overall gas load.",
    ],
    processTitle: "Vacuum Drying System Workflow",
    processSteps: [
      {
        desc: "Vacuum booster increases suction performance for enhanced chamber vacuum.",
        image: "/category-media/dryling-line/vacuum-system.png",
      },
      {
        desc: "Condenser cools and condenses vapors to reduce load on the vacuum pump.",
        image: "/category-media/dryling-line/overview.png",
      },
      {
        desc: "Vacuum pump evacuates non-condensable gases for stable process conditions.",
        image: "/category-media/dryling-line/atomiser.png",
      },
    ],
    importanceTitle: "Why Vacuum Stability Matters",
    importanceDescription:
      "Consistent vacuum is critical for moisture removal, product uniformity, and continuous high-capacity drying line operation.",
    importanceItems: [
      "Improves moisture evaporation efficiency",
      "Reduces energy demand on pumps",
      "Enhances product consistency",
      "Improves reliability of full drying line",
    ],
    detailTitle: "Brit Soap Vacuum Drying System",
    detailParagraphs: [
      "The system is engineered as an integrated package to optimize vacuum generation and condensation performance.",
      "Component coordination improves thermal efficiency and supports stable long-duration operation.",
      "Designed for spray drying and continuous soap production environments requiring predictable process control.",
    ],
    detailImage: "/category-media/dryling-line/vacuum-system.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used in spray drying and continuous soap manufacturing lines where moisture control, energy efficiency, and process stability are primary objectives.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "soap-atomiser": {
    title: "Atomiser / Vacuum Spray Chamber",
    description:
      "Vacuum spray chamber for rapid conversion of liquid neat soap into dried solid soap.",
    video: DEFAULT_VIDEO,
    introTitle: "Rapid Vacuum Spray Drying For Uniform Soap Output",
    introParagraphs: [
      "The atomiser sprays liquid soap under controlled vacuum conditions, enabling fast moisture removal and consistent solidification.",
      "It integrates into downstream refining or plodding systems for flexible production of noodles or finished soap bars.",
    ],
    processTitle: "Atomiser Drying Process",
    processSteps: [
      {
        desc: "Liquid soap is sprayed onto chamber surfaces through controlled rotating assembly.",
        image: "/category-media/dryling-line/atomiser.png",
      },
      {
        desc: "Under vacuum, moisture evaporates rapidly and soap solidifies within seconds.",
        image: "/category-media/dryling-line/overview.png",
      },
      {
        desc: "Scraper system removes solidified soap and transfers material to downstream handling.",
        image: "/category-media/dryling-line/powder-separator.png",
      },
    ],
    importanceTitle: "Why Atomisation Is Critical",
    importanceDescription:
      "Atomisation quality governs drying speed, moisture uniformity, and overall line throughput for solid soap production.",
    importanceItems: [
      "Very fast drying under vacuum conditions",
      "Uniform moisture removal and quality",
      "Supports noodles or bar production routes",
      "Improves full-line process efficiency",
    ],
    detailTitle: "Brit Soap Atomiser / Vacuum Spray Chamber",
    detailParagraphs: [
      "The chamber is designed for continuous vacuum spray drying with robust industrial construction.",
      "Integrated shaft, nozzle, scraping, and observation systems support reliable operation and maintenance access.",
      "Contact parts use suitable stainless-steel construction for hygiene and long service life.",
    ],
    detailImage: "/category-media/dryling-line/atomiser.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used for converting liquid neat soap into dried base for refining lines, or feeding directly into extrusion pathways based on plant configuration.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  
  
  
  "manual-pneumatic-soap-stamper": {
  
    title: "Manual Pneumatic Soap Stamper",
    description: "Compact manual pneumatic stamper for artisanal and small-scale soap production.",
    video: "/assets/ManualStamper/manual-penumatic-soap-stamper.mov",
    introTitle: "Precise Manual Stamping For Quality Soap Branding",
    introParagraphs: [
      "The Manual Pneumatic Soap Stamper is designed for small to medium-scale soap production, delivering precision embossing with minimal operator effort.",
      "Ideal for artisanal producers and contract manufacturers, the stamper ensures consistent bar shape and sharp logo impression on every bar.",
    ],
    processTitle: "The Manual Stamping Process",
    processSteps: [
      {
        desc: "Soap bars are positioned on the stamping plate, aligned with the die.",
        image: "/assets/ManualStamper/manual-bar-soap-stamper.JPG",
      },
      {
        desc: "The operator activates the pneumatic press, which drives the die down onto the soap bar with controlled force.",
        image: "/assets/ManualStamper/manual-penumatic-bar-soap-stamper.png",
      },
      {
        desc: "The stamped bar is removed, showing a clean, uniform embossed impression ready for packaging.",
        image: "/assets/ManualStamper/manual-soap-press.png",
      },
    ],
    importanceTitle: "Why Manual Stamping Is Effective",
    importanceDescription: "Manual stampers provide flexibility and precision for producers who value customization.",
    importanceItems: [
      "Precise embossing with clean impressions",
      "Low equipment cost and minimal maintenance",
      "Flexible bar size and design options",
      "Ideal for small to medium batch production",
    ],
    detailTitle: "Brit Soap Manual Pneumatic Stamper",
    detailParagraphs: [
      "Engineered for reliable performance in artisanal and small-scale soap manufacturing.",
      "Sturdy steel frame with precision-engineered pneumatic components.",
      "Easily replaceable stamping die for design flexibility.",
    ],
    detailImage: "/assets/ManualStamper/manual-penumatic-bar-soap-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription: "Ideal for artisanal soap makers and small manufacturing operations.",
    capacities: ["100-200 bars/hour"],
  },
  "hrd-soap-stamper": {
    title: "HRD Soap Stamper",
    description: "Heavy-duty pneumatic stamper engineered for high-speed embossing of toilet soap bars.",
    video: "/assets/HRDStamper/toilet-soap-stamping-machine.mp4",
    introTitle: "High-Performance Stamping For Industrial Toilet Soap Production",
    introParagraphs: [
      "The HRD Soap Stamper is designed for high-capacity toilet soap production lines, delivering fast, consistent embossing with sharp, clean impressions.",
      "Built for industrial duty, the stamper integrates seamlessly into finishing lines, providing reliable performance under demanding production schedules.",
    ],
    processTitle: "The HRD Stamping Process",
    processSteps: [
      {
        desc: "Soap bars are automatically fed onto the stamping platform at high speed.",
        image: "/assets/HRDStamper/automatic-soap-stamping-machine.jpeg",
      },
      {
        desc: "The pneumatic dies press down onto the soap, creating precise embossed impressions with controlled force.",
        image: "/assets/HRDStamper/soap-stamper-machine.png",
      },
      {
        desc: "Stamped bars are discharged, ready for downstream processing or packaging.",
        image: "/assets/HRDStamper/soap-press-industrial.jpg",
      },
    ],
    importanceTitle: "Why HRD Stamper Is Essential",
    importanceDescription: "Combines speed with precision for consistent branding in large-volume production.",
    importanceItems: [
      "High-speed embossing capability",
      "Consistent impression quality",
      "Industrial-duty reliability",
      "Easy die changeover",
    ],
    detailTitle: "Brit Soap HRD Stamper",
    detailParagraphs: [
      "Engineered for continuous high-capacity production with robust frame and precision-guided dies.",
      "Accommodates various die designs for quick changeover.",
      "Industrial-grade components designed for 24/7 operation.",
    ],
    detailImage: "/assets/HRDStamper/soap-stamper-die.jpeg",
    applicationTitle: "Application In Production",
    applicationDescription: "Designed for high-capacity industrial toilet soap production lines.",
    capacities: ["300-500 bars/minute"],
  },
  "rotary-soap-stamper": {
    title: "Rotary Soap Stamper",
    description: "High-capacity rotary stamper utilizing rotary die technology for rapid, precise embossing.",
    video: "/assets/RotaryStamper/automatic-soap-stamping-machine.mp4",
    introTitle: "High-Speed Rotary Stamping For Premium Soap Finishing",
    introParagraphs: [
      "The Rotary Soap Stamper is engineered for high-capacity production environments, using rotating dies to deliver rapid, consistent embossing.",
      "Ideal for large-scale operations producing branded toilet soaps, laundry bars, and specialty soaps.",
    ],
    processTitle: "The Rotary Stamping Process",
    processSteps: [
      {
        desc: "Soap bars are continuously fed through the rotary stamper at high speed.",
        image: "/assets/RotaryStamper/rotary-soap-stamper.png",
      },
      {
        desc: "Rotating dies press onto the soap bars with precision-controlled pressure.",
        image: "/assets/RotaryStamper/soap-stampin-machine.jpg",
      },
      {
        desc: "Embossed bars are discharged in continuous flow for downstream processing.",
        image: "/assets/RotaryStamper/industrial-soap-bar-stamping.jpg",
      },
    ],
    importanceTitle: "Why Rotary Stamping Is Superior",
    importanceDescription: "Rotary die technology enables continuous, high-speed production while maintaining quality.",
    importanceItems: [
      "Continuous high-speed embossing",
      "Consistent impression quality",
      "Reduced production cycle time",
      "Minimal maintenance and wear",
    ],
    detailTitle: "Brit Soap Rotary Stamper",
    detailParagraphs: [
      "Sophisticated machine designed for continuous, high-capacity soap production.",
      "Rotating die mechanism enables seamless operation at high production speeds.",
      "Modular die design for quick changeover.",
    ],
    detailImage: "/assets/RotaryStamper/rotary-soap-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription: "Ideal for large-scale industrial soap production requiring continuous, high-speed embossing.",
    capacities: ["500-1000+ bars/minute"],
  },
  "vertical-soap-stamper": {
    title: "Vertical Soap Stamping Machine | Automatic Soap Stamping for Advanced Soap Finishing Lines",
    description: "High-precision vertical soap stamper engineered for superior shaping, reduced scrap, and consistent quality in modern soap finishing lines",
    video: "/assets/VerticalStamper/vertical-final.mp4",
    introTitle: "Rotary Soap Stamper for High-Speed, Uniform Soap Bar Production",
    introParagraphs: [
      "Traditional rotary soap stamping machines have long been used in soap finishing lines; however, they often face limitations in handling irregular soap shapes, achieving consistent definition, and minimizing material wastage. The Vertical Stamper (VPress) represents a significant advancement—offering improved accuracy, flexibility, and reduced scrap generation, making it ideal for modern, high-quality soap production."
    ],
    processTitle: "",
    processSteps: [
    ],
    importanceTitle: "Why Vertical Stamping Excels",
    importanceDescription: "Vertical design offers precision in a compact footprint.",
    importanceItems: [
      "Precise vertical pressure control",
      "Compact footprint with high throughput",
      "Easy integration with finishing lines",
      "Reliable, low-maintenance operation",
    ],
    detailTitle: "Brit Soap Vertical Stamper",
    detailParagraphs: [
      "Combines precision engineering with a space-efficient design.",
      "Vertical pressing mechanism ensures uniform force application.",
      "Modular die system allows quick changeover.",
    ],
    detailImage: "/assets/VerticalStamper/vertical-soap-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription: "Ideal for medium to high-capacity soap production lines.",
    capacities: ["300-700 bars/minute"],
  },
  "six-face-soap-stamper": {
    title: "Six Face Soap Stamping Machine | Automatic Stamping for Cubic & Cuboid Soaps in Advanced Finishing Lines",
    description: "Fully automatic six-side soap stamper engineered for precision embossing, uniform shape, and premium finish in continuous soap production lines.",
    video: "/assets/SixFaceStamper/automatic-cube-stamper.mov",
    introTitle: "Rotary Soap Stamper for High-Speed, Uniform Soap Bar Production",
    introParagraphs: [
      "The Brit Soap Machinery 6F Stamper is a soap finishing solution designed to deliver perfectly shaped cuboid and rectangular soaps with sharp, consistent embossing on all six faces. Built for modern, high-efficiency soap manufacturing lines, it replaces conventional stamping systems with a more durable, automated, and precision-driven approach.",
    ],
    processTitle: "",
    processSteps: [],
    importanceTitle: "",
    importanceDescription: "",
    importanceItems: [],
    detailTitle: "",
    detailParagraphs: [],
    detailImage: "/assets/SixFaceStamper/soap-stamper-cuboid-six-side-stamper.png",
    applicationTitle: "",
    applicationDescription: "",
    capacities: [],
  },
  "laundry-soap-stamper": {
    title: "Laundry Soap Stamper Machine | Dual-Side Stamping for Laundry Soap Finishing Lines",
    description: "Automatic laundry soap stamper designed for precise dual-side embossing of rectangular soap bars in high-efficiency soap finishing lines.",
    video: "/assets/LaundryStamper/laundry-soap-stamper.mov",
    introTitle: "Dual Rotary Stamping for Laundry Soap Bars",
    introParagraphs: [
      "The Brit Soap Laundry Soap Stamper is a high-performance rotary soap stamping machine engineered for accurate and efficient stamping of rectangular banded laundry soaps and toilet soaps. Designed for integration into modern soap finishing lines, it ensures uniform shape, clean embossing, and reliable throughput with minimal handling.",
    ],
    processTitle: "",
    processSteps: [],
    importanceTitle: "",
    importanceDescription: "",
    importanceItems: [],
    detailTitle: "",
    detailParagraphs: [],
    detailImage: "/assets/LaundryStamper/laundry-soap-stamper.png",
    applicationTitle: "",
    applicationDescription: "",
    capacities: [],
  },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; product: string }>;
}) {
  const { lang, category: categorySlug, product: productSlug } = await params;

  if (!categorySlug || !productSlug) return notFound();

  const localCategory = getLocalCategoryWithProducts(categorySlug);
  if (localCategory) {
    const localProduct = (localCategory.products as any[]).find(
      (p) => p.slug === productSlug
    );

    if (!localProduct) return notFound();

    const templateData = LOCAL_PRODUCT_PAGES[productSlug];

    if (!templateData) {
      const image = localProduct.detailSection?.images?.[0] || "/placeholder.png";

      return (
        <Layout>
          <section className="py-16 bg-primary text-center">
            <div className="container">
              <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
                {localCategory.title}
              </h2>
              <h1 className="text-4xl font-bold text-primary-foreground">
                {localProduct.title}
              </h1>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid md:grid-cols-2 gap-12 items-start">
              <div>
                <Image
                  src={image}
                  alt={localProduct.title}
                  width={600}
                  height={400}
                  className="w-full rounded-lg object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  {localProduct.title}
                </h2>

                <p className="text-muted-foreground mb-6">
                  {localProduct.description}
                </p>

                <p className="text-sm text-muted-foreground mb-4">
                  Detailed specifications, capacity options, and technical diagrams
                  will be published shortly.
                </p>

                <div className="text-sm text-muted-foreground mb-2">
                  Category:{" "}
                  <span className="font-medium text-primary">
                    {localCategory.title}
                  </span>
                </div>

                <div className="text-sm text-muted-foreground">
                  Route:{" "}
                  <span className="font-medium text-primary">
                    /{lang}/products/{categorySlug}/{productSlug}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      );
    }

    if (productSlug === "saponification-crutcher-soap-manufacturing") {
      return (
        <Layout>
          <ProductHero
            title="Saponification Crutcher | High-Efficiency Soap Reaction Vessel for Semi-Boiled Process"
            description="Advanced industrial crutcher for efficient saponification, mixing, and soap manufacturing processes."
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Precision-Engineered Crutcher for Consistent Soap Production & Additive Mixing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Saponification Crutcher is a critical reaction vessel designed for the semi-boiled soap manufacturing process, enabling precise mixing of fatty acids, caustic soda, brine, and water. Engineered for efficiency, it ensures uniform reaction, optimal cycle times, and consistent soap quality. Ideal for both soap production and additive blending applications.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Saponification Crutcher
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Saponification Crutcher is the primary reaction vessel in the semi-boiled saponification process, widely used in industrial soap manufacturing plants.
                  </p>
                  <p>
                    It is designed to efficiently produce a wide variety of soaps and to enable precise mixing of additives, fillers, and liquid soap formulations.
                  </p>
                  <p>
                    All raw materials including fatty acids, caustic soda (alkali), brine, and water are accurately dosed into the crutcher and continuously mixed until the saponification reaction is complete, ensuring consistent soap quality and batch uniformity.
                  </p>
                  <div className="space-y-2 rounded-2xl border border-border bg-white p-5 md:p-6">
                    <p className="font-semibold text-primary">The system is engineered based on a 2-hour cycle time, optimized for high productivity:</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>30 minutes for charging raw materials</li>
                      <li>60 minutes for saponification reaction</li>
                      <li>30 minutes for discharge</li>
                    </ul>
                  </div>
                  <p>
                    Critical parameters such as pump ratings, saponification value of fats, caustic liquor concentration, and reaction temperature play a vital role in achieving efficient and consistent batch cycles.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <div className="grid gap-4">
                  <Image
                    src="/assets/SaponificationCrutcher/industrial-soap-manufacturing.jpeg"
                    alt="Industrial soap manufacturing setup"
                    width={900}
                    height={520}
                    className="h-[220px] md:h-[260px] w-full object-contain rounded-2xl bg-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Image
                      src="/assets/SaponificationCrutcher/soap-from-oil-caustic.JPG"
                      alt="Soap base output from oil and caustic process"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                    <Image
                      src="/assets/SaponificationCrutcher/neat-soap-production.jpeg"
                      alt="Neat soap production"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Ideal for Modern Soap Manufacturing Plants
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The Brit Soap Heat Exchanger is suitable for:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Continuous soap drying systems</li>
                    <li>High-efficiency soap finishing lines</li>
                    <li>Industrial liquid soap heating and moisture removal applications</li>
                  </ul>
                  <p className="font-semibold text-primary">Key Benefits:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Improves overall drying efficiency by enabling faster and uniform moisture evaporation</li>
                    <li>Ensures consistent soap quality with controlled temperature management</li>
                    <li>Enhances production capacity through continuous and stable operation</li>
                    <li>Reduces energy wastage with efficient steam-based heat transfer</li>
                    <li>Minimizes process variability, leading to better finish and reduced rework</li>
                    <li>Built for reliability, resulting in lower maintenance and longer equipment life</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50">
                <Image
                  src={templateData.detailImage}
                  alt={templateData.title}
                  width={900}
                  height={1100}
                  className="h-[420px] md:h-[560px] w-full object-contain p-6"
                />
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered For Efficiency. Built For Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "saponification-jet") {
      return (
        <Layout>
          <ProductHero
            title={templateData.title}
            description={templateData.description}
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Steam-Powered Saponification Jet for Continuous & Instant Soap Processing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Saponification Jet is an advanced, no-moving-parts system designed for instant soap production using steam energy. Utilizing venturi vacuum technology, it enables rapid mixing of caustic liquor and oils, delivering up to 90% reacted neat soap directly from the unit. Ideal for high-capacity, continuous soap manufacturing lines.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Saponification Jet
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Saponification Jet is a highly efficient instant saponification device used in modern industrial soap manufacturing, designed to operate without any moving parts.
                  </p>
                  <p>
                    It utilizes motive steam as the primary energy source, ensuring low maintenance and reliable performance. The system requires only 100 kg of steam per tonne of soap, making it an energy-efficient solution for continuous soap production.
                  </p>
                  <p>
                    A single jet unit can be adjusted to handle soap output capacities ranging from 1 to 10 tonnes per hour, offering flexibility across different plant scales.
                  </p>
                  <div className="space-y-2 rounded-2xl border border-border bg-white p-5 md:p-6">
                    <p className="font-semibold text-primary">Engineering and Construction:</p>
                    <ul className="space-y-2 list-disc pl-5 text-sm">
                      <li>No moving parts for minimal maintenance</li>
                      <li>Operates using 5 bar motive steam</li>
                      <li>Venturi jet system for vacuum generation</li>
                      <li>Needle valve control for flow rate and output regulation</li>
                      <li>Dual concentric barrel design for raw material feeding</li>
                      <li>Engineered for continuous operation and durability</li>
                      <li>Optimized for low steam consumption (100 kg/tonne of soap)</li>
                    </ul>
                  </div>
                  <p>
                    The jet operates by passing 5 bar motive steam through an internal venturi, creating a strong vacuum. This vacuum enables precise and controlled suction of raw materials. Surrounding the steam jet are two concentric barrels designed for caustic liquor (alkali) and oils/fatty materials.
                  </p>
                  <p>
                    The venturi-induced vacuum draws both streams into the mixing zone, where they interact in the presence of steam, resulting in instantaneous saponification and producing up to 90% reacted neat soap.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <div className="grid gap-4">
                  <Image
                    src="/assets/SaponificationJet/saponification-jet-soap.png"
                    alt="Saponification jet soap system"
                    width={900}
                    height={520}
                    className="h-[220px] md:h-[260px] w-full object-contain rounded-2xl bg-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Image
                      src="/assets/SaponificationJet/venturi-system-soap-reactor.jpg"
                      alt="Venturi system soap reactor"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                    <Image
                      src="/assets/SaponificationCrutcher/soap-from-oil-caustic.JPG"
                      alt="Soap formation in saponification process"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Uses and Benefits
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The Saponification Jet enhances production efficiency by significantly reducing reaction time and energy consumption. Its streamlined design supports consistent output quality while lowering operational costs and maintenance requirements.</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Enables instant soap production, reducing processing time</li>
                    <li>Improves energy efficiency with low steam consumption</li>
                    <li>Ensures consistent and uniform saponification</li>
                    <li>Reduces mechanical wear due to no moving parts</li>
                    <li>Supports scalable production from 1 to 10 TPH</li>
                    <li>Minimizes maintenance and operational downtime</li>
                    <li>Delivers high conversion efficiency (up to 90% neat soap)</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          <CTASection
            title="Engineered For Efficiency. Built For Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "manual-pneumatic-soap-stamper") {
      return (
        <Layout>
          <ProductHero
            title="Manual Pneumatic Soap Stamper | Compact Soap Finishing Machine for Precision Stamping"
            description="Cost-Effective Single Cavity Stamper for Low Capacity Soap Production"
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Manual Accurate Stamping for Soap Finishing Lines
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Brit Soap Manual Pneumatic Stamper is a compact, manually
                  operated soap finishing machine designed for precise stamping
                  of toilet soaps and laundry soaps. Engineered for low-capacity
                  production environments, it offers reliable performance,
                  consistent embossing quality, and economical operation, making
                  it ideal for small-scale manufacturers and pilot production
                  lines.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/ManualStamper/manual-penumatic-bar-soap-stamper.png"
                  alt="Manual pneumatic soap stamper"
                  width={900}
                  height={700}
                  className="h-[340px] md:h-[480px] w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Manual Pneumatic Soap Stamper operates through a simple
                  and efficient soap finishing process where pre-cut soap bars
                  are manually placed onto the bottom die cavity. The operator
                  then engages the mechanical door with pneumatic actuation,
                  which safely closes to bring the top die into alignment.
                </p>
                <p>
                  This action applies uniform pressure to compress, shape, and
                  emboss the soap bar, ensuring precise branding and a clean
                  finish. Once the cycle is complete, the door opens for easy
                  removal and repeat operation.
                </p>
                <p>
                  The machine delivers an output of approximately 10-15 soap
                  bars per minute, depending on operator speed, making it ideal
                  for low-capacity soap production. The pneumatically assisted
                  safety door mechanism enhances operator safety while
                  maintaining consistent soap stamping quality and efficiency.
                </p>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Construction &amp; Functional Advantages
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Built with durability, operator safety, and ease of use in
                    mind, this machine combines robust mechanical design with
                    pneumatic assistance for enhanced stamping efficiency.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Heavy-duty frame construction for stability and long
                      service life
                    </li>
                    <li>
                      Pneumatically assisted lever operation for reduced
                      operator fatigue
                    </li>
                    <li>
                      Single cavity die system ensuring precision stamping for
                      each soap bar
                    </li>
                    <li>Compatible with banded and bandless soap formats</li>
                    <li>
                      High-quality brass soap dies with non-stick coating for
                      clean release and superior finish
                    </li>
                  </ul>
                  <p>
                    This configuration makes the machine highly suitable for
                    consistent soap embossing, reduced wastage, and easy
                    maintenance, while maintaining a low investment cost.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/ManualStamper/manual-soap-press.png"
                  alt="Manual soap press"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Key Features, Highlights &amp; Applications
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Designed for efficient, low-capacity soap finishing, the
                    Manual Pneumatic Soap Stamper combines precision stamping
                    with operational simplicity. Its compact, cost-effective
                    design makes it ideal for flexible production environments,
                    pilot runs, and customised soap manufacturing.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Manual pneumatic soap stamper for precise and consistent
                      soap finishing
                    </li>
                    <li>
                      Single cavity system ensuring controlled output and
                      uniform embossing
                    </li>
                    <li>Suitable for both toilet soaps and laundry soaps</li>
                    <li>Compatible with banded and bandless soap formats</li>
                    <li>
                      Brass dies with anti-stick coating for clean release and
                      high-quality branding
                    </li>
                    <li>
                      Compact footprint ideal for small production setups and
                      limited floor space
                    </li>
                    <li>
                      Low investment, energy-efficient solution for small-scale
                      manufacturing
                    </li>
                    <li>
                      Built with high safety standards and durable construction
                    </li>
                    <li>
                      Ideal for artisanal soap makers and small-scale production
                      units
                    </li>
                    <li>
                      Suitable for pilot batches, product trials, and
                      customised soap runs
                    </li>
                    <li>Effective for low-volume soap finishing lines</li>
                    <li>
                      Can be used as a backup or auxiliary unit in automated
                      soap plants
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/ManualStamper/manual-bar-soap-stamper.JPG"
                  alt="Manual bar soap stamper"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "hrd-soap-stamper") {
      const hrdProductSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "HRD Soap Stamper",
        description:
          "Integrated soap cutting and stamping machine for continuous plodder output. Ensures consistent bar shape, smooth finish, and flexible die configurations.",
        brand: {
          "@type": "Brand",
          name: "Brit Soap Machinery",
        },
        category: "Soap Manufacturing Machinery",
        image: [
          "/assets/HRDStamper/soap-stamper-machine.png",
          "/assets/HRDStamper/automatic-soap-stamping-machine.jpeg",
          "/assets/HRDStamper/soap-press-industrial.jpg",
        ],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Operation Speed",
            value: "Up to 70 stamps per minute",
          },
          {
            "@type": "PropertyValue",
            name: "Process",
            value: "Integrated cutting and stamping",
          },
          {
            "@type": "PropertyValue",
            name: "Soap Type Compatibility",
            value: "Banded and bandless soaps",
          },
        ],
      };

      const hrdFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does the HRD Soap Stamper do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The HRD Soap Stamper performs integrated cutting and stamping of continuous soap billets from the plodder into finished toilet soap bars in a single operation.",
            },
          },
          {
            "@type": "Question",
            name: "What is the stamping speed of the HRD Soap Stamper?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The machine supports high-speed operation up to 70 stamps per minute, depending on soap formulation and production settings.",
            },
          },
          {
            "@type": "Question",
            name: "Is the HRD Soap Stamper suitable for different soap formulations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The HRD Soap Stamper is designed to perform reliably across varying soap formulations and supports both banded and bandless soap types.",
            },
          },
          {
            "@type": "Question",
            name: "Does the machine support quick die changes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It includes a quick die-change arrangement that reduces downtime during product transitions and improves production flexibility.",
            },
          },
        ],
      };

      return (
        <Layout>
          <Script
            id="hrd-soap-stamper-product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hrdProductSchema),
            }}
          />
          <Script
            id="hrd-soap-stamper-faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hrdFaqSchema),
            }}
          />
          <ProductHero
            title="HRD Soap Stamper | Integrated Cutting and Stamping for Continuous Soap Bars"
            description="Precision HRD soap stamper for continuous cutting and stamping. Designed for consistent quality and seamless integration in modern soap production lines."
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Continuous Soap Stamping with Superior Finish Quality
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Brit Soap HRD Stamper is a high-performance soap stamping
                  machine designed to transform continuous soap billets from the
                  plodder into precisely shaped and finished toilet soap bars in
                  a single operation. Built for efficiency, consistency, and
                  high output, the machine integrates cutting and stamping.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/HRDStamper/soap-stamping-machine.png"
                  alt={
                    LOCAL_PRODUCT_SEO["hrd-soap-stamper"].imageAlt ||
                    "HRD soap stamper machine"
                  }
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[440px] w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The HRD Stamper is built on a rigid, industrial-grade
                  structure designed to ensure stability during continuous
                  high-speed operation. The machine integrates a compact cutting
                  and stamping unit, optimised for precision and repeatability.
                </p>
                <p>
                  Its unique stamping process, which simultaneously feeds,
                  stamps, and extracts the soap, enables smoother release from
                  the die cavities allowing excess soap to be separated gently
                  from the finished bars.
                </p>
                <p>
                  A dual ejection system, combining air and mechanical action,
                  further ensures reliable product release across varying soap
                  formulations.
                </p>
                <p>
                  The control panel provides intuitive operation, while the
                  variable speed drive system allows precise adjustment of
                  stamping rates. An integrated discharge conveyor supports
                  smooth product handling, and the quick die change arrangement
                  minimises downtime during product transitions.
                </p>
                <p>
                  The overall construction reflects a focus on durability,
                  controlled operation, and ease of maintenance, aligned with
                  modern, continuous soap manufacturing processes. The machine
                  can handle production for banded and bandless type of soaps.
                </p>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_1fr] items-start">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Key Benefits &amp; Functional Highlights
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Speed operation up to 70 stamps per minute</li>
                    <li>
                      Reliable and consistent bar definition across production
                      runs
                    </li>
                    <li>
                      Performs reliably across varying soap formulations
                    </li>
                    <li>
                      Smooth synchronization with upstream and downstream
                      equipment
                    </li>
                    <li>
                      Quick die changeover for operational flexibility and
                      reduced downtime
                    </li>
                    <li>
                      Optimized ejection by combined air and mechanical release
                      for smooth bar discharge
                    </li>
                    <li>
                      Integrated conveyor ensures efficient product transfer,
                      reduced handling, and improved production efficiency
                    </li>
                    <li>
                      Operator-friendly interface for simplified control
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Image
                    src="/assets/HRDStamper/soap-stamper-machine.png"
                    alt="HRD soap stamper machine"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                  <Image
                    src="/assets/HRDStamper/soap-stamper-die.jpeg"
                    alt="HRD soap stamper die"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                  <Image
                    src="/assets/HRDStamper/soap-press-industrial.jpg"
                    alt="Industrial soap press"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                  <Image
                    src="/assets/HRDStamper/soap-press-die.jpeg"
                    alt="Soap press die assembly"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                  <Image
                    src="/assets/HRDStamper/soap-bar-stamper.jpeg"
                    alt="Stamped soap bars"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                  <Image
                    src="/assets/HRDStamper/automatic-soap-stamping-machine.jpeg"
                    alt="Automatic soap stamping machine"
                    width={260}
                    height={180}
                    className="h-[110px] md:h-[120px] w-full object-contain rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "rotary-soap-stamper") {
      const rotaryProductSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Rotary Soap Stamper Machine",
        description:
          "Automatic rotary soap stamper for shaping, embossing and finishing soap bars. Designed for continuous production lines with consistent output.",
        brand: {
          "@type": "Brand",
          name: "Brit Soap Machinery",
        },
        category: "Soap Manufacturing Machinery",
        image: [
          "/assets/RotaryStamper/rotary-soap-stamper.png",
          "/assets/RotaryStamper/soap-stampin-machine.jpg",
          "/assets/RotaryStamper/industrial-soap-bar-stamping.jpg",
        ],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Die Cavity Configuration",
            value: "2 to 6 cavities",
          },
          {
            "@type": "PropertyValue",
            name: "Stamping Process",
            value: "Double-action rotary stamping",
          },
          {
            "@type": "PropertyValue",
            name: "Integrated Systems",
            value: "In-feed conveyor, out-feed conveyor, vacuum de-flashing",
          },
        ],
      };

      const rotaryFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the Rotary Soap Stamper used for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Rotary Soap Stamper is used for continuous shaping, embossing, and finishing of soap bars in automated soap production lines.",
            },
          },
          {
            "@type": "Question",
            name: "How many die cavity options are available?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The machine supports flexible 2 to 6 die cavity configurations to match different production capacities and soap formats.",
            },
          },
          {
            "@type": "Question",
            name: "Does the Rotary Soap Stamper support continuous line integration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. It includes integrated in-feed and out-feed conveyors for smooth transfer from upstream plodder and cutter systems to downstream wrapping.",
            },
          },
          {
            "@type": "Question",
            name: "How does the machine improve finish quality?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The machine combines cam-driven synchronized motion, vacuum-assisted de-flashing, and chilled die blocks to support clean release and consistent soap bar finish.",
            },
          },
        ],
      };

      return (
        <Layout>
          <Script
            id="rotary-soap-stamper-product-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(rotaryProductSchema),
            }}
          />
          <Script
            id="rotary-soap-stamper-faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(rotaryFaqSchema),
            }}
          />
          <ProductHero
            title="Rotary Soap Stamper Machine for Soap Manufacturing"
            description="Engineered for smooth flow, consistent bar formation, and seamless integration with downstream processes."
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Rotary Soap Stamper for Continuous, Consistent Soap Bar Finishing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Brit Soap Rotary Soap Stamper is a high-performance
                  horizontal stamping machine engineered for continuous,
                  high-speed soap production lines. Designed with a rotating
                  mandrel system and precision cam-driven motion, it ensures
                  consistent shape definition, smooth surface finish, and
                  efficient de-flashing, making it ideal for modern automated
                  soap manufacturing.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Rotary Soap Stamper
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Brit Soap Rotary Soap Stamper Machine is an advanced
                    automatic soap stamping system designed for continuous soap
                    production lines. Built with a rotary mandrel carrying
                    multiple die blocks and an oscillating ram mechanism for
                    double-action stamping, the machine enables efficient soap
                    bar shaping, embossing, and finishing in a single
                    integrated process.
                  </p>
                  <p>
                    The machine is supplied with integrated in-feed and out-feed
                    conveyors, enabling continuous material flow from upstream
                    equipment.
                  </p>
                  <p>
                    The Rotary Soap Stamper is constructed with a horizontal
                    frame and cam-driven stamping mechanism, ensuring
                    synchronized movement across all stages of operation. Soap
                    billets are transferred via the in-feed conveyor and
                    positioned using a lifting mechanism before entering the
                    stamping zone.
                  </p>
                  <p>
                    The double-action stamping system forms the soap bar using
                    die blocks mounted on the rotating mandrel. After shaping,
                    the soap is indexed to the unloading position where a
                    vacuum-assisted de-flashing system removes excess material
                    and transfers the finished bar to the discharge conveyor.
                  </p>
                  <p>
                    The dies are designed with internal chilling galleries that
                    circulate low-temperature refrigerant, helping maintain
                    clean release of soap from cavities and supporting
                    consistent surface finish across production cycles.
                  </p>
                  <p>
                    With 2 to 6 die cavity configurations, the machine supports
                    a wide range of production capacities and soap formats. It
                    is supplied with in-feed and out-feed conveyors, ensuring
                    smooth transfer of soap billets from the plodder and cutter
                    into the stamping stage and onward to wrapping.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <div className="grid gap-4">
                  <Image
                    src="/assets/RotaryStamper/rotary-soap-stamper.png"
                    alt={
                      LOCAL_PRODUCT_SEO["rotary-soap-stamper"].imageAlt ||
                      "Rotary soap stamper machine"
                    }
                    width={900}
                    height={520}
                    className="h-[220px] md:h-[260px] w-full object-contain rounded-2xl bg-white"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Image
                      src="/assets/RotaryStamper/soap-stampin-machine.jpg"
                      alt="Rotary stamping die machine"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                    <Image
                      src="/assets/RotaryStamper/industrial-soap-bar-stamping.jpg"
                      alt="Industrial soap bar stamping"
                      width={420}
                      height={320}
                      className="h-[180px] md:h-[220px] w-full object-contain rounded-2xl bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Key Benefits &amp; Functional Highlights
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Automatic soap stamping machine with rotary mandrel system
                    </li>
                    <li>
                      2 to 6 cavity soap die configurations for flexible
                      production
                    </li>
                    <li>
                      Double-action soap pressing mechanism for uniform shaping
                    </li>
                    <li>
                      Integrated conveyor system for continuous soap production
                    </li>
                    <li>
                      Vacuum de-flashing system for clean soap edges
                    </li>
                    <li>
                      Chilled die blocks to reduce sticking and improve release
                    </li>
                    <li>
                      Cam-controlled movement for synchronized operation
                    </li>
                    <li>
                      Suitable for integration with soap plodder and soap cutter
                      machines
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "soap-heat-exchanger") {
      return (
        <Layout>
          <ProductHero
            title="Heat Exchanger | Liquid Soap Processing for efficient soap drying lines"
            description="Precision Heat Exchanger for efficient soap heating and moisture evaporation. Designed for controlled temperature performance and seamless integration in modern soap drying lines."
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  High-Performance Heat Exchanger for Liquid Soap Processing
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Brit Soap Heat Exchanger is a critical component in modern
                  soap drying lines, designed to efficiently raise the
                  temperature of liquid soap prior to entering the soap drying
                  chamber. This controlled heating process ensures that excess
                  water rapidly evaporates, enabling consistent soap quality and
                  optimal drying performance.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Advanced Heat Transfer &amp; Precise Temperature Control
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The unit consists of a large number of small tubes through
                    which the liquid soap is pumped. These tubes are externally
                    heated by steam, ensuring uniform heat transfer and
                    efficient thermal exchange while enabling precise control
                    over soap temperature for optimal drying performance.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Steam heating enables rapid and consistent temperature
                      increase
                    </li>
                    <li>
                      Multi-tube configuration ensures maximum surface area for
                      heat exchange
                    </li>
                    <li>
                      Designed for continuous and high-capacity soap production
                      lines
                    </li>
                    <li>
                      Temperature can be adjusted by varying steam pressure
                    </li>
                    <li>
                      Flow rate of liquid soap can be controlled to regulate
                      heating intensity
                    </li>
                    <li>
                      Ensures controlled and consistent evaporation of excess
                      moisture
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/DrylingLine/heat-exchanger-soap-drying.jpg"
                  alt="Heat exchanger for soap drying line"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[0.95fr_1fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/DrylingLine/heat-exchanger-tubes.png"
                  alt="Heat exchanger tube plate assembly"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Robust Stainless Steel Construction &amp; Safety Engineering
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Built for reliability, hygiene, and long-term industrial
                    performance, the heat exchanger is constructed using
                    high-grade stainless steel and engineered to meet stringent
                    safety standards.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Tubes: AISI 316L stainless steel for superior corrosion
                      resistance
                    </li>
                    <li>
                      Shell, diaphragms, plates, and cones: AISI 304 stainless
                      steel
                    </li>
                    <li>
                      Designed for long service life in demanding industrial
                      environments
                    </li>
                    <li>
                      Equipped with an expansion joint to handle thermal stress
                    </li>
                    <li>Designed operating (project) pressure: 8-10 bars</li>
                    <li>
                      Pressure tested at 14 bars to ensure safety and durability
                    </li>
                  </ul>
                  <p>
                    Speak with our engineers to discuss your production
                    requirements and identify the right capacity, configuration,
                    and customization for your plant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Ideal for Modern Soap Manufacturing Plants
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The Brit Soap Heat Exchanger is suitable for:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Continuous soap drying systems</li>
                    <li>High-efficiency soap finishing lines</li>
                    <li>
                      Industrial liquid soap heating and moisture removal
                      applications
                    </li>
                  </ul>
                  <p className="font-semibold text-primary">Key Benefits:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Improves overall drying efficiency by enabling faster and
                      uniform moisture evaporation
                    </li>
                    <li>
                      Ensures consistent soap quality with controlled
                      temperature management
                    </li>
                    <li>
                      Enhances production capacity through continuous and stable
                      operation
                    </li>
                    <li>
                      Reduces energy wastage with efficient steam-based heat
                      transfer
                    </li>
                    <li>
                      Minimizes process variability, leading to better finish and
                      reduced rework
                    </li>
                    <li>
                      Built for reliability, resulting in lower maintenance and
                      longer equipment life
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "powder-separator") {
      return (
        <Layout>
          <ProductHero
            title="Powder Separators | Efficient powder separation for soap drying lines"
            description="High-efficiency powder separation for removing fine dust particles from vacuum spray chamber exhaust gases."
            video={templateData.video}
          />

          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Powder Separators for Soap Drying Systems
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Brit Soap Powder Separators are a critical component in
                  modern soap drying lines, designed to efficiently remove fine
                  dust particles from gases exiting the vacuum spray chamber.
                  This controlled separation process prevents soap particles from
                  entering the barometric condenser cooling water, ensuring
                  smooth plant operation, improved effluent management, and
                  consistent overall system performance.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  Efficient Dust Removal Process in Soap Drying Systems
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Brit Soap Powder Separators efficiently remove fine dust
                    particles from gases exiting the Vacuum Spray Chamber,
                    ensuring cleaner exhaust flow, protecting downstream systems,
                    and improving overall process efficiency.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Effectively separates fine soap particles from exhaust
                      gases
                    </li>
                    <li>
                      Prevents soap carryover into the Barometric Condenser
                      cooling water
                    </li>
                    <li>
                      Reduces risks of contamination and operational disruptions
                    </li>
                    <li>
                      Supports smoother effluent discharge and wastewater
                      management
                    </li>
                    <li>
                      Enhances overall plant efficiency and reliability
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <div className="grid gap-4">
                  <Image
                    src="/assets/DrylingLine/soap-drying-dust-collector.png"
                    alt="Soap drying dust collector"
                    width={900}
                    height={520}
                    className="h-[220px] md:h-[260px] w-full object-contain rounded-2xl bg-white"
                  />
                  <Image
                    src="/assets/DrylingLine/soap-drying-filteration.png"
                    alt="Soap drying gas filtration"
                    width={900}
                    height={520}
                    className="h-[220px] md:h-[260px] w-full object-contain rounded-2xl bg-white"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[0.95fr_1fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/DrylingLine/powder-separator.png"
                  alt="Cyclone powder separator unit"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Robust Engineering &amp; Durable Construction
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Brit Soap manufactures dual cyclone powder separators,
                    engineered for reliable and continuous industrial
                    performance.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Available with contact parts in AISI 304 stainless steel
                      or Carbon Steel
                    </li>
                    <li>
                      Designed for efficient cyclone-based particle separation
                    </li>
                    <li>
                      Equipped with catch pots at the bottom of the separators
                    </li>
                    <li>
                      Fitted with an isolating valve, allowing the drum to be
                      emptied without stopping the plant
                    </li>
                    <li>
                      Built for durability and long service life in demanding
                      soap manufacturing environments
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-center">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Ideal for Soap Manufacturing Plants - Key Benefits
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The Brit Soap Powder Separators are ideal for:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Continuous soap drying and vacuum spray systems</li>
                    <li>Integrated soap processing and finishing lines</li>
                    <li>
                      Industrial plants requiring efficient dust and particle
                      control
                    </li>
                  </ul>
                  <p className="font-semibold text-primary">Key Benefits:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      Prevents contamination of cooling water systems in the
                      Barometric Condenser
                    </li>
                    <li>
                      Supports smoother plant operations and reduces effluent
                      discharge issues
                    </li>
                    <li>
                      Improves overall system efficiency by removing fine
                      particles effectively
                    </li>
                    <li>
                      Enables uninterrupted production with easy maintenance via
                      isolating valve system
                    </li>
                    <li>
                      Enhances environmental compliance and cleaner plant
                      operations
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/DrylingLine/powder-separator-drying-plant.png"
                  alt="Powder separator in drying plant"
                  width={900}
                  height={700}
                  className="h-[320px] md:h-[420px] w-full object-contain rounded-2xl bg-white"
                />
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "six-face-soap-stamper") {
      return (
        <Layout>
          <ProductHero
            title={templateData.title}
            description={templateData.description}
            video={templateData.video}
          />

          {/* Intro */}
          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  BRIT SOAP MACHINERY
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  {templateData.introTitle}
                </h2>
                {templateData.introParagraphs.map((p, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Machine detail — image left, text right */}
          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_1.2fr] items-start">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6 sticky top-24">
                <Image
                  src="/assets/SixFaceStamper/soap-stamper-cuboid-six-side-stamper.png"
                  alt="Brit Soap Six Face Soap Stamping Machine"
                  width={700}
                  height={700}
                  className="w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-foreground">Six Side Soap Stamping Machine</strong> integrates automation, precision engineering, and durability to ensure consistent output and reduced manual intervention in soap finishing operations.
                </p>
                <p>
                  An <strong className="text-foreground">input conveyor system</strong> allows continuous feeding of multiple soap billets. A <strong className="text-foreground">pick-and-place mechanism</strong> accurately positions each soap above the mould cavity, ensuring correct alignment before stamping.
                </p>
                <p>
                  The soap is then held firmly using <strong className="text-foreground">specially engineered sliding side punches</strong>, which stabilize the billet during the stamping cycle. A <strong className="text-foreground">vertical reciprocating top punch</strong> compresses the soap into the mould cavity, achieving a sharp cuboid geometry and uniform embossing across all six surfaces.
                </p>
                <p>
                  Post-stamping, the <strong className="text-foreground">side punches retract</strong>, and a <strong className="text-foreground">bottom punch ejects</strong> the finished soap smoothly. A <strong className="text-foreground">gripper transfer system</strong> then places the stamped soap onto an output conveyor for downstream handling or packaging.
                </p>
                <p>The stamping system includes:</p>
                <ul className="space-y-1 pl-1">
                  <li><strong className="text-foreground">6 precision brass punches</strong> (top, bottom, and four sides)</li>
                  <li><strong className="text-foreground">Integrated cooling galleries</strong> to prevent sticking and ensure clean release</li>
                  <li>A <strong className="text-foreground">high-grade alloy mould</strong> for extended service life and consistent dimensional accuracy</li>
                </ul>
                <p>
                  The machine is equipped with a <strong className="text-foreground">PLC and HMI-based control panel</strong>, enabling operator-friendly control, repeatability, and integration into automated soap finishing lines.
                </p>
              </div>
            </div>
          </section>

          {/* Key Benefits + 3 images */}
          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.9fr] items-start">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  Key Benefits &amp; Functional Highlights
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                  <li>Fully automatic <strong className="text-foreground">six-side soap stamping system</strong> for premium finish</li>
                  <li>Uniform embossing on <strong className="text-foreground">all faces including sides and edges</strong></li>
                  <li>Suitable for <strong className="text-foreground">cuboid and rectangular soaps (50 mm – 100 mm range)</strong></li>
                  <li>Precision <strong className="text-foreground">pick-and-place feeding mechanism</strong></li>
                  <li><strong className="text-foreground">Sliding side punch technology</strong> for firm holding and sharp definition</li>
                  <li>Brass punches with <strong className="text-foreground">cooling galleries for anti-sticking performance</strong></li>
                  <li>Durable <strong className="text-foreground">alloy mould construction for long operational life</strong></li>
                  <li>Integrated <strong className="text-foreground">PLC &amp; HMI controls for automation and consistency</strong></li>
                  <li>Seamless integration into <strong className="text-foreground">continuous soap finishing lines</strong></li>
                  <li>Reduced maintenance compared to conventional stamping machines</li>
                </ul>
              </div>

              {/* 3-image grid: tall left + 2 stacked right */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-border shadow-sm row-span-2">
                  <Image
                    src="/assets/SixFaceStamper/automatic-soap-press.jpg"
                    alt="Six face stamping mechanism interior"
                    width={420}
                    height={580}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src="/assets/SixFaceStamper/cuboid-soap-press.jpg"
                    alt="Six face soap stamper brass die assembly"
                    width={420}
                    height={280}
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src="/assets/SixFaceStamper/marseille-soap-stamper.jpg"
                    alt="Cuboid soap bar with six face embossing"
                    width={420}
                    height={280}
                    className="w-full h-44 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "laundry-soap-stamper") {
      return (
        <Layout>
          <ProductHero
            title={templateData.title}
            description={templateData.description}
            video={templateData.video}
          />

          {/* Intro */}
          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  BRIT SOAP MACHINERY
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  {templateData.introTitle}
                </h2>
                {templateData.introParagraphs.map((p, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Machine detail — image left, text right */}
          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_1.2fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/LaundryStamper/laundry-soap-stamper.png"
                  alt="Brit Soap Laundry Soap Stamper Machine"
                  width={700}
                  height={600}
                  className="w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Built for durability and precision, this <strong className="text-foreground">automatic soap stamper</strong> incorporates a robust rotary die system and synchronized material handling for smooth, continuous operation. The machine features a <strong className="text-foreground">rotating die box with four stations</strong>, each equipped with <strong className="text-foreground">two cavities</strong>, enabling <strong className="text-foreground">two stamped soaps per stroke</strong>—optimizing output while maintaining consistent quality.
                </p>
                <p>
                  The die box is manufactured from a <strong className="text-foreground">special alloy for extended service life</strong>, while the <strong className="text-foreground">die punches are equipped with internal cooling galleries</strong> circulating chilled water (down to -25°C) to prevent soap adhesion and ensure clean release—critical for maintaining embossing clarity and reducing downtime.
                </p>
                <p>
                  A <strong className="text-foreground">dual in-feed conveyor system</strong> feeds two parallel streams of soap bars into the stamping zone using <strong className="text-foreground">intermittent motion</strong>, ensuring precise positioning and smooth transfer. A <strong className="text-foreground">single synchronized pusher assembly</strong> inserts two soap bars into the die cavities while simultaneously ejecting stamped soaps, which are aligned via an off-take conveyor for efficient downstream handling.
                </p>
              </div>
            </div>
          </section>

          {/* Key Benefits + 2 images */}
          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.9fr] items-start">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  Key Benefits &amp; Functional Highlights
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                  <li>Dual-side stamping capability for rectangular soap bars</li>
                  <li>Rotary die box with 4 stations × 2 cavities (2 soaps per stroke)</li>
                  <li>Special alloy die construction for long operational life</li>
                  <li>Chilled die punches with cooling galleries (-25°C) to prevent sticking</li>
                  <li>Dual in-feed conveyor for parallel soap feeding</li>
                  <li>Intermittent conveyor motion for accurate positioning</li>
                  <li>Single pusher system for simultaneous feeding and ejection</li>
                  <li>Off-take conveyor for aligned soap discharge</li>
                  <li>Designed for continuous, high-efficiency soap finishing lines</li>
                </ul>
              </div>

              <div className="relative flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src="/assets/LaundryStamper/soap-press-die-laundry-soap.jpeg"
                    alt="Laundry soap stamper die plates"
                    width={600}
                    height={380}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border shadow-sm md:ml-10">
                  <Image
                    src="/assets/LaundryStamper/laundry-soap-bar-production.jpeg"
                    alt="Laundry soap stamper mechanism"
                    width={600}
                    height={380}
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    if (productSlug === "vertical-soap-stamper") {
      return (
        <Layout>
          <ProductHero
            title={templateData.title}
            description={templateData.description}
            video={templateData.video}
          />

          {/* Intro */}
          <section className="py-16 bg-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  BRIT SOAP MACHINERY
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  {templateData.introTitle}
                </h2>
                {templateData.introParagraphs.map((p, i) => (
                  <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Machine detail — image left, text right */}
          <section className="py-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_1.2fr] items-center">
              <div className="rounded-[2rem] border border-border overflow-hidden shadow-sm bg-slate-50 p-5 md:p-6">
                <Image
                  src="/assets/VerticalStamper/vertical-soap-stamper.png"
                  alt="Brit Soap Vertical Stamping Machine"
                  width={700}
                  height={600}
                  className="w-full object-contain rounded-2xl bg-white"
                />
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-foreground">Brit Soap Machinery Vertical Stamping Machine (BSM / VPress)</strong> is engineered for <strong className="text-foreground">precision soap finishing</strong> and seamless integration into <strong className="text-foreground">automated soap production lines</strong>. A continuous soap billet from the <strong className="text-foreground">duplex vacuum plodder</strong> is cut into uniform slugs using an <strong className="text-foreground">automatic soap cutter,</strong> then transferred via conveyors to the stamping unit for a synchronized workflow.
                </p>
                <p>
                  A <strong className="text-foreground">vacuum pick-and-place system</strong> positions each slug between precision upper and lower dies. The <strong className="text-foreground">vertical reciprocating stamping mechanism</strong> ensures uniform compression, accurate shaping, and superior surface finish for consistent soap bar geometry.
                </p>
                <p>
                  The lower die, mounted on an <strong className="text-foreground">indexed rotating mandrel</strong>, enables efficient transfer of stamped bars. A <strong className="text-foreground">vacuum-operated handling system</strong> moves finished bars onto the out-feed conveyor, ready for <strong className="text-foreground">downstream wrapping and packaging</strong>.
                </p>
                <p>
                  An integrated <strong className="text-foreground">de-flashing (trimming) system</strong> removes excess material, significantly reducing scrap. Separated flash is automatically recycled back into the process, improving <strong className="text-foreground">material efficiency and yield</strong>.
                </p>
                <p>
                  <strong className="text-foreground">Temperature-controlled chilled dies</strong> prevent soap sticking and ensure smooth, continuous operation across various soap formulations.
                </p>
                <p>
                  Available in <strong className="text-foreground">VPress 04 and VPress 06</strong>, the machine features <strong className="text-foreground">PLC-controlled automation with HMI</strong>, delivering high repeatability, process control, and operator ease. Supplied with a <strong className="text-foreground">vacuum pump and die set</strong>, it is ready for immediate integration into <strong className="text-foreground">industrial soap manufacturing lines</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Key Benefits + 4 images */}
          <section className="pb-20 bg-background">
            <div className="container grid gap-10 md:grid-cols-[1fr_0.95fr] items-start">
              <div className="rounded-[2rem] border border-border bg-white p-7 md:p-10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  Key Benefits &amp; Functional Highlights
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground leading-relaxed">
                  <li>Vertical stamping mechanism for enhanced precision and uniformity</li>
                  <li>Lower scrap generation compared to rotary stamping machines</li>
                  <li>Handles irregular and complex soap shapes with ease</li>
                  <li>Vacuum pick-and-place system for accurate slug positioning</li>
                  <li>Indexed rotating mandrel for efficient bar transfer</li>
                  <li>Integrated de-flashing system for clean finishing</li>
                  <li>Chilled dies to prevent soap sticking and ensure smooth release</li>
                  <li>Seamless integration with soap finishing lines and wrapping systems</li>
                  <li>PLC-controlled operation with user-friendly HMI interface</li>
                  <li>Available in multiple capacities: VPress 04 and VPress 06</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/assets/VerticalStamper/soap-die-soap-stamping-machine.jpeg", alt: "Vertical stamper soap die plate" },
                  { src: "/assets/VerticalStamper/automatic-soap-stamping-machine.png", alt: "Vertical stamping mechanism" },
                  { src: "/assets/VerticalStamper/soap-press-machine.jpeg", alt: "Soap press die molds" },
                  { src: "/assets/VerticalStamper/bar-soap-stamping-machine.jpg", alt: "Bar soap in stamping die" },
                ].map(({ src, alt }) => (
                  <div key={src} className="rounded-xl overflow-hidden border border-border bg-slate-50">
                    <Image
                      src={src}
                      alt={alt}
                      width={420}
                      height={300}
                      className="w-full h-44 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CTASection
            title="Engineered for Efficiency. Built for Reliability"
            description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
            buttonText="Speak with an Engineer"
            buttonLink={`/${lang}/contact`}
            showSecondaryButton={false}
          />
        </Layout>
      );
    }

    return (
      <Layout>
        <ProductHero
          title={templateData.title}
          description={templateData.description}
          video={templateData.video}
        />

        <RefinerIntro
          title={templateData.introTitle}
          paragraphs={templateData.introParagraphs}
        />

        <Section title={templateData.processTitle} center>
          <Grid items={templateData.processSteps} />
        </Section>

        <ImportanceGrid
          title={templateData.importanceTitle}
          description={templateData.importanceDescription}
          items={templateData.importanceItems}
        />

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4">
                {templateData.detailTitle}
              </h2>
              {templateData.detailParagraphs.map((para, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="relative">
              <Image
                src={templateData.detailImage}
                alt={templateData.title}
                width={600}
                height={500}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm shadow">
                Industrial Grade
              </div>
            </div>
          </div>
        </section>

        <div className="bg-primary text-white py-12 md:py-20 px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center leading-snug">
            {templateData.applicationTitle}
          </h2>
          <div className="max-w-5xl mx-auto pt-6 md:pt-8 text-center">
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              {templateData.applicationDescription}
            </p>
          </div>
        </div>

        <Section
          title="Capacity Range"
          description="Available in multiple production capacities to suit different manufacturing scales."
          center
        >
          <CapacityRange capacities={templateData.capacities} />
        </Section>

        <CTASection
          title="Engineered For Efficiency. Built For Reliability"
          description="Speak with our engineers to discuss your production requirements and identify the right capacity, configuration, and customization for your plant."
          buttonText="Speak with an Engineer"
          buttonLink={`/${lang}/contact`}
        />
      </Layout>
    );
  }

  const category = await getCategoryWithProducts(categorySlug);

  if (!category) return notFound();

  const product: Product | undefined = category.products.find(
    (p) => p.slug === productSlug
  );

  if (!product) return notFound();

  return (
    <Layout>
      <section className="py-16 bg-primary text-center">
        <div className="container">
          <h2 className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-2">
            {category.title}
          </h2>
          <h1 className="text-4xl font-bold text-primary-foreground">
            {product.name}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-start">
          <div>
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {product.name}
            </h2>

            <p className="text-muted-foreground mb-6">
              {product.shortDescription}
            </p>

            <div className="text-sm text-muted-foreground">
              Category:{" "}
              <span className="font-medium text-primary">
                {category.title}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}