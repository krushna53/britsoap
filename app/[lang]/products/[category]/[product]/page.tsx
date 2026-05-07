import { notFound } from "next/navigation";
import Image from "next/image";
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

const LOCAL_PRODUCT_PAGES: Record<string, LocalProductPageData> = {
  "saponification-crutcher": {
    title: "Saponification Crutcher",
    description:
      "Batch reaction vessel for controlled semi-boiled soap production with stable quality and formulation flexibility.",
    video: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
    introTitle: "Controlled Batch Saponification For Consistent Neat Soap",
    introParagraphs: [
      "The Saponification Crutcher is the primary reaction vessel in semi-boiled soap production, where fatty acids, caustic soda, brine, and water are blended under controlled process conditions.",
      "It is designed for manufacturers who need formulation flexibility while maintaining consistent reaction quality and repeatable batch performance.",
    ],
    processTitle: "The Saponification Crutcher Process",
    processSteps: [
      {
        desc: "Raw materials are charged into the vessel with accurate dosing of oils, caustic liquor, brine, and water.",
        image: "/assets/SaponificationCrutcher/neat-soap-production.jpeg",
      },
      {
        desc: "The agitator maintains uniform mixing through the reaction stage to complete saponification.",
        image: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
      },
      {
        desc: "Neat soap is discharged for downstream drying and finishing operations.",
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
      "Built for industrial duty, the crutcher supports reliable semi-boiled process operation with strong mixing performance and repeatable cycles.",
      "The process sequence is typically designed around charging, reaction, and discharge phases to balance quality and throughput.",
      "The system is suitable for both neat soap generation and additive blending depending on plant process design.",
    ],
    detailImage: "/assets/SaponificationCrutcher/soap-saponification-crutcher.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used in industrial soap plants requiring controlled batch saponification, especially where recipe flexibility and process stability are key requirements.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "saponification-jet": {
    title: "Saponification Jet",
    description:
      "Steam venturi based instant soap reaction system for continuous production with low maintenance and high efficiency.",
    video: "/assets/SaponificationJet/saponification-jet-soap.png",
    introTitle: "Instant Continuous Saponification Using Venturi Steam Technology",
    introParagraphs: [
      "The Saponification Jet uses motive steam and venturi vacuum to draw and mix caustic liquor with oils for rapid soap reaction.",
      "Its no-moving-parts design supports energy-efficient and low-maintenance operation in high-capacity soap plants.",
    ],
    processTitle: "The Saponification Jet Process",
    processSteps: [
      {
        desc: "Motive steam passes through the venturi section to generate suction and controlled vacuum.",
        image: "/assets/SaponificationJet/venturi-system-soap-reactor.jpg",
      },
      {
        desc: "Caustic and oil streams are drawn into the mixing zone with adjustable flow control.",
        image: "/assets/SaponificationJet/soap-saponification-plant.png",
      },
      {
        desc: "Instant saponification occurs and high-reacted neat soap is discharged for drying.",
        image: "/assets/SaponificationJet/saponification-jet-soap.png",
      },
    ],
    importanceTitle: "Why Jet Saponification Is Effective",
    importanceDescription:
      "Continuous jet saponification reduces reaction time while maintaining stable output quality across higher production rates.",
    importanceItems: [
      "Instant reaction and faster throughput",
      "Low steam consumption profile",
      "No moving parts and lower maintenance",
      "Scalable output for different plant capacities",
    ],
    detailTitle: "Brit Soap Saponification Jet",
    detailParagraphs: [
      "The system operates on venturi-driven suction with motive steam, enabling controlled and repeatable continuous reaction.",
      "Needle valve adjustment allows operators to tune flow, output, and process stability based on production requirements.",
      "Its compact and robust build is designed for long-duty industrial operation with minimal mechanical complexity.",
    ],
    detailImage: "/assets/SaponificationJet/saponification-jet-soap.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Ideal for continuous soap manufacturing lines where high output, consistent reaction quality, and low-maintenance operation are required.",
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
    title: "Vertical Soap Stamper",
    description: "Vertical pneumatic stamper engineered for accurate embossing with a compact footprint.",
    video: "/assets/VerticalStamper/vertical-final.mp4",
    introTitle: "Precision Vertical Stamping For Consistent Bar Quality",
    introParagraphs: [
      "The Vertical Soap Stamper is designed for precise embossing of soap bars using a vertical stamping mechanism.",
      "Perfect for medium to high-capacity lines, the stamper delivers reliable performance with easy integration into existing finishing equipment.",
    ],
    processTitle: "The Vertical Stamping Process",
    processSteps: [
      {
        desc: "Soap bars are positioned on the stamping base, aligned with the vertical press.",
        image: "/assets/VerticalStamper/vertical-soap-stamper.png",
      },
      {
        desc: "The pneumatic press moves vertically downward, applying controlled force.",
        image: "/assets/VerticalStamper/automatic-soap-stamping-machine.png",
      },
      {
        desc: "Stamped bars are ejected and ready for downstream packaging.",
        image: "/assets/VerticalStamper/bar-soap-stamping-machine.jpg",
      },
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
    title: "Six-Face Soap Stamper",
    description: "Specialized stamper for embossing soap bars on six faces simultaneously.",
    video: "/assets/SixFaceStamper/automatic-cube-stamper.mov",
    introTitle: "Premium Multi-Face Embossing For Luxury Soap Bars",
    introParagraphs: [
      "The Six-Face Soap Stamper is designed specifically for premium soap bars with cuboid designs.",
      "Perfect for manufacturers seeking distinctive, branded luxury soap bars.",
    ],
    processTitle: "The Six-Face Stamping Process",
    processSteps: [
      {
        desc: "Cuboid soap bars are positioned with precision alignment guides.",
        image: "/assets/SixFaceStamper/soap-stamper-cuboid-six-side-stamper.png",
      },
      {
        desc: "Multiple pneumatic dies engage simultaneously, embossing all six faces.",
        image: "/assets/SixFaceStamper/cubeoid-soap-press.jpg",
      },
      {
        desc: "Completed bars are ejected, fully embossed on all sides.",
        image: "/assets/SixFaceStamper/marseille-soap-stamper.jpg",
      },
    ],
    importanceTitle: "Why Six-Face Stamping Is Important",
    importanceDescription: "Six-face embossing creates distinctive premium products with complete surface branding.",
    importanceItems: [
      "Complete surface branding on all faces",
      "Premium product differentiation",
      "Simultaneous multi-face embossing",
      "Consistent quality across complex designs",
    ],
    detailTitle: "Brit Soap Six-Face Stamper",
    detailParagraphs: [
      "Advanced system engineered for premium soap production.",
      "Multiple die sets positioned to engage all six faces simultaneously.",
      "Modular die design for quick changeover.",
    ],
    detailImage: "/assets/SixFaceStamper/soap-stamper-cuboid-six-side-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription: "Specifically designed for premium luxury soap bar production.",
    capacities: ["100-300 bars/minute"],
  },
  "laundry-soap-stamper": {
    title: "Laundry Soap Stamper",
    description: "Purpose-built stamper engineered specifically for laundry soap bar production.",
    video: "/assets/LaundryStamper/laundry-soap-stamper.mov",
    introTitle: "Specialized Embossing For Laundry Soap Production",
    introParagraphs: [
      "The Laundry Soap Stamper is specifically designed for laundry soap bar production.",
      "Engineered to handle the characteristics of laundry soap formulations.",
    ],
    processTitle: "The Laundry Soap Stamping Process",
    processSteps: [
      {
        desc: "Laundry soap bars are fed through the stamping line at controlled speed.",
        image: "/assets/LaundryStamper/laundry-soap-bar-production.jpeg",
      },
      {
        desc: "Pneumatic dies engage with controlled force, creating uniform embossed impressions.",
        image: "/assets/LaundryStamper/laundry-soap-syamper.png",
      },
      {
        desc: "Stamped bars are discharged in continuous flow for downstream processing.",
        image: "/assets/LaundryStamper/soap-press-die-laundry-soap.jpeg",
      },
    ],
    importanceTitle: "Why Specialized Laundry Stamping Matters",
    importanceDescription: "Laundry soaps require specialized equipment for consistent branding.",
    importanceItems: [
      "Optimized for laundry soap formulations",
      "Handles larger bar dimensions",
      "Maintains bar structural integrity",
      "Consistent branding at high volumes",
    ],
    detailTitle: "Brit Soap Laundry Stamper",
    detailParagraphs: [
      "Engineered specifically for laundry soap bar production.",
      "Heavy-duty components handle harder formulations.",
      "Adjustable pressure settings for different bar specifications.",
    ],
    detailImage: "/assets/LaundryStamper/laundry-soap-syamper.png",
    applicationTitle: "Application In Production",
    applicationDescription: "Designed for high-capacity laundry soap production.",
    capacities: ["400-800 bars/minute"],
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