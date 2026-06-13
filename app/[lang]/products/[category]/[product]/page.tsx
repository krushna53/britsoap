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
    video: DEFAULT_VIDEO,
    introTitle: "Controlled Batch Saponification For Consistent Neat Soap",
    introParagraphs: [
      "The Saponification Crutcher is the primary reaction vessel in semi-boiled soap production, where fatty acids, caustic soda, brine, and water are blended under controlled process conditions.",
      "It is designed for manufacturers who need formulation flexibility while maintaining consistent reaction quality and repeatable batch performance.",
    ],
    processTitle: "The Saponification Crutcher Process",
    processSteps: [
      {
        desc: "Raw materials are charged into the vessel with accurate dosing of oils, caustic liquor, brine, and water.",
        image: "/category-media/soponification/overview.png",
      },
      {
        desc: "The agitator maintains uniform mixing through the reaction stage to complete saponification.",
        image: "/category-media/soponification/crutcher.png",
      },
      {
        desc: "Neat soap is discharged for downstream drying and finishing operations.",
        image: "/category-media/soponification/jet.png",
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
    detailImage: "/category-media/soponification/crutcher.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used in industrial soap plants requiring controlled batch saponification, especially where recipe flexibility and process stability are key requirements.",
    capacities: ["1 ton/hr", "2 tons/hr", "3 tons/hr", "4 tons/hr"],
  },
  "saponification-jet": {
    title: "Saponification Jet",
    description:
      "Steam venturi based instant soap reaction system for continuous production with low maintenance and high efficiency.",
    video: DEFAULT_VIDEO,
    introTitle: "Instant Continuous Saponification Using Venturi Steam Technology",
    introParagraphs: [
      "The Saponification Jet uses motive steam and venturi vacuum to draw and mix caustic liquor with oils for rapid soap reaction.",
      "Its no-moving-parts design supports energy-efficient and low-maintenance operation in high-capacity soap plants.",
    ],
    processTitle: "The Saponification Jet Process",
    processSteps: [
      {
        desc: "Motive steam passes through the venturi section to generate suction and controlled vacuum.",
        image: "/category-media/soponification/jet.png",
      },
      {
        desc: "Caustic and oil streams are drawn into the mixing zone with adjustable flow control.",
        image: "/category-media/soponification/overview.png",
      },
      {
        desc: "Instant saponification occurs and high-reacted neat soap is discharged for drying.",
        image: "/category-media/soponification/crutcher.png",
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
    detailImage: "/category-media/soponification/jet.png",
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
    description:
      "Compact single-cavity soap stamper for low-capacity production, pilot batches, and custom branded runs.",
    video: DEFAULT_VIDEO,
    introTitle: "Cost-Effective Precision Stamping For Small-Scale Production",
    introParagraphs: [
      "The manual pneumatic stamper is designed for controlled low-volume production where consistent embossing and brand clarity are required.",
      "It is suitable for toilet and laundry soap formats, including pilot lines, artisanal manufacturing, and product trial batches.",
    ],
    processTitle: "Manual Stamping Workflow",
    processSteps: [
      {
        desc: "Operator places pre-cut soap slug into the lower die cavity.",
        image: "/category-media/soap-stampers/manual-stamper.png",
      },
      {
        desc: "Pneumatic assist closes top die and applies uniform compression for shaping and embossing.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Stamped bar is released and removed, ready for repeat operation.",
        image: "/category-media/soap-stampers/laundry-stamper.png",
      },
    ],
    importanceTitle: "Why Manual Pneumatic Stamping Is Useful",
    importanceDescription:
      "It provides repeatable embossing quality with low capital investment for flexible and low-capacity operations.",
    importanceItems: [
      "Consistent embossing at low throughput",
      "Compact footprint for smaller plants",
      "Suitable for pilot and custom soap runs",
      "Lower operating complexity and cost",
    ],
    detailTitle: "Brit Soap Manual Pneumatic Stamper",
    detailParagraphs: [
      "The machine combines robust frame construction with pneumatic assistance to improve operator ease and output consistency.",
      "Single-cavity design enables precise and controlled stamping with clean release using suitable die materials.",
      "It is well-suited as a primary unit for small production or auxiliary backup in larger lines.",
    ],
    detailImage: "/category-media/soap-stampers/manual-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Best suited for artisanal manufacturers, pilot lots, custom orders, and low-volume finishing lines requiring controlled branding quality.",
    capacities: ["10-15 bars/min", "Pilot batch", "Low-capacity production"],
  },
  "hrd-soap-stamper": {
    title: "HRD Soap Stamper",
    description:
      "Integrated cutting and stamping machine for continuous soap billets with stable finish and repeatable geometry.",
    video: DEFAULT_VIDEO,
    introTitle: "Continuous Cutting + Stamping In One Machine",
    introParagraphs: [
      "The HRD stamper is designed to receive continuous soap from the plodder line and perform cutting and stamping in a synchronized operation.",
      "Its combined feed, stamp, and ejection sequence supports consistent output with reduced handling and stable line integration.",
    ],
    processTitle: "HRD Stamping Process",
    processSteps: [
      {
        desc: "Continuous soap feed enters the machine from upstream extrusion/cutting line.",
        image: "/category-media/soap-stampers/hrd-stamper.png",
      },
      {
        desc: "Integrated mechanism performs shaping and embossing with controlled die action.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Dual ejection support transfers finished bars for downstream handling.",
        image: "/category-media/soap-stampers/laundry-stamper.png",
      },
    ],
    importanceTitle: "Why HRD Stamper Is Valuable",
    importanceDescription:
      "By combining operations and maintaining stable stamping quality, HRD improves throughput consistency and production efficiency.",
    importanceItems: [
      "Integrated cutting and stamping workflow",
      "Stable bar definition at production speed",
      "Flexible die change for product variants",
      "Reduced handling between process stages",
    ],
    detailTitle: "Brit Soap HRD Soap Stamper",
    detailParagraphs: [
      "The HRD stamper is built on a rigid industrial structure designed for reliable continuous operation.",
      "Its synchronized stamping and extraction pattern supports clean product release across varying formulations.",
      "Operator controls and speed adjustment support process tuning for different soap formats and capacities.",
    ],
    detailImage: "/category-media/soap-stampers/hrd-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Suitable for medium-to-high capacity soap finishing lines that require integrated cutting and stamping with repeatable quality.",
    capacities: ["Up to 70 stamps/min", "Medium capacity", "Continuous line use"],
  },
  "rotary-soap-stamper": {
    title: "Rotary Soap Stamper",
    description:
      "High-speed rotary stamping system for continuous soap production with uniform shape and clean finish.",
    video: DEFAULT_VIDEO,
    introTitle: "Automatic Rotary Stamping For Continuous Lines",
    introParagraphs: [
      "The rotary stamper uses a rotating mandrel and cam-driven mechanism to deliver consistent high-speed soap bar shaping and embossing.",
      "Integrated in-feed and out-feed handling supports smooth material transfer in automated finishing lines.",
    ],
    processTitle: "Rotary Stamping Workflow",
    processSteps: [
      {
        desc: "Soap billets are fed and positioned into the rotary stamping zone.",
        image: "/category-media/soap-stampers/rotary-stamper.png",
      },
      {
        desc: "Die blocks perform double-action stamping with consistent geometry control.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Finished bars are discharged after de-flashing and transferred downstream.",
        image: "/category-media/soap-stampers/laundry-stamper.png",
      },
    ],
    importanceTitle: "Why Rotary Stamping Is Effective",
    importanceDescription:
      "Rotary systems are optimized for high-output lines where repeatability, speed, and stable quality are critical.",
    importanceItems: [
      "Continuous high-speed operation",
      "Uniform shape and embossing consistency",
      "Supports multiple cavity configurations",
      "Smooth integration with finishing lines",
    ],
    detailTitle: "Brit Soap Rotary Stamper",
    detailParagraphs: [
      "The machine is designed with robust rotary mechanics and synchronized control for repeatable industrial performance.",
      "Chilled die and de-flashing support improve release quality and reduce visual defects.",
      "Configuration flexibility enables adaptation to different soap formats and plant outputs.",
    ],
    detailImage: "/category-media/soap-stampers/rotary-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Ideal for automated soap finishing lines requiring high throughput, consistent branding quality, and reduced manual intervention.",
    capacities: ["2 cavity", "4 cavity", "6 cavity", "High-speed continuous output"],
  },
  "vertical-soap-stamper": {
    title: "Vertical Soap Stamper",
    description:
      "Vertical stamping system with high precision, reduced scrap, and excellent suitability for advanced soap finishes.",
    video: DEFAULT_VIDEO,
    introTitle: "Precision Vertical Stamping For Premium Soap Bars",
    introParagraphs: [
      "Vertical stamping architecture improves alignment and shaping control for modern finishing lines.",
      "Vacuum handling and de-flashing integration help improve yield while maintaining clean embossed definition.",
    ],
    processTitle: "Vertical Stamping Process",
    processSteps: [
      {
        desc: "Cut slugs are positioned accurately using vacuum pick-and-place handling.",
        image: "/category-media/soap-stampers/vertical-stamper.png",
      },
      {
        desc: "Vertical reciprocating dies compress and emboss with controlled force.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Finished bars are transferred to output while flash is separated for recycle.",
        image: "/category-media/soap-stampers/six-face-stamper.png",
      },
    ],
    importanceTitle: "Why Vertical Stamping Is Preferred",
    importanceDescription:
      "Vertical systems improve precision and reduce material loss, especially for premium soap formats.",
    importanceItems: [
      "Higher dimensional consistency",
      "Lower scrap compared to conventional systems",
      "Strong compatibility with automated lines",
      "Reliable handling of complex soap shapes",
    ],
    detailTitle: "Brit Soap Vertical Stamper",
    detailParagraphs: [
      "Designed for advanced finishing lines, the vertical stamper combines precision motion with automated product handling.",
      "Temperature-controlled die conditions help prevent sticking and maintain clean release quality.",
      "PLC/HMI-based control architecture supports repeatability and easier operation across production shifts.",
    ],
    detailImage: "/category-media/soap-stampers/vertical-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Recommended for high-quality toilet soap production and lines targeting better geometric control and lower material wastage.",
    capacities: ["VPress 04", "VPress 06", "Continuous automated operation"],
  },
  "six-face-soap-stamper": {
    title: "6 Face Soap Stamper",
    description:
      "Automatic six-side stamping system for cuboid and rectangular soaps with full-surface branding.",
    video: DEFAULT_VIDEO,
    introTitle: "All-Side Stamping For Premium Cuboid Soap Formats",
    introParagraphs: [
      "The six-face stamper is designed to emboss all sides of cuboid soap with uniform geometry and sharp definition.",
      "Automated feeding, positioning, and punch action reduce manual dependency while improving consistency.",
    ],
    processTitle: "Six-Face Stamping Workflow",
    processSteps: [
      {
        desc: "Soap billets are fed continuously and positioned over mold cavity.",
        image: "/category-media/soap-stampers/six-face-stamper.png",
      },
      {
        desc: "Top, bottom, and side punches shape and emboss all faces in one cycle.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Stamped bars are ejected and transferred to outfeed for packing integration.",
        image: "/category-media/soap-stampers/rotary-stamper.png",
      },
    ],
    importanceTitle: "Why Six-Face Stamping Is Important",
    importanceDescription:
      "For premium and export-oriented formats, full-surface branding and dimensional consistency are critical quality requirements.",
    importanceItems: [
      "Uniform embossing on all six sides",
      "Improved brand visibility and finish quality",
      "Consistent cuboid shape control",
      "Reduced dependence on manual finishing",
    ],
    detailTitle: "Brit Soap 6 Face Stamper",
    detailParagraphs: [
      "The machine combines precision punch mechanics with automatic handling to deliver stable high-quality output.",
      "Cooling and material selection in punch/mold systems support better release and long-term durability.",
      "PLC-controlled automation allows integration into advanced continuous finishing lines.",
    ],
    detailImage: "/category-media/soap-stampers/six-face-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Used for cuboid and rectangular premium soap formats requiring complete-face stamping and high repeatability.",
    capacities: ["50 mm to 100 mm soap size range", "Automatic line integration"],
  },
  "laundry-soap-stamper": {
    title: "Laundry Soap Stamper",
    description:
      "Dual-side rotary laundry soap stamping machine for high-volume rectangular bars with consistent embossing.",
    video: DEFAULT_VIDEO,
    introTitle: "High-Efficiency Stamping For Laundry Soap Bars",
    introParagraphs: [
      "The laundry stamper is engineered for rectangular bar formats and continuous high-throughput operation.",
      "Its rotary die architecture and synchronized feed/ejection improve consistency while reducing handling losses.",
    ],
    processTitle: "Laundry Stamping Workflow",
    processSteps: [
      {
        desc: "Dual in-feed conveyor streams position soap bars for synchronized stamping.",
        image: "/category-media/soap-stampers/laundry-stamper.png",
      },
      {
        desc: "Rotary die box performs dual-side embossing with stable alignment.",
        image: "/category-media/soap-stampers/overview.jpeg",
      },
      {
        desc: "Stamped bars are discharged in aligned flow for downstream packing.",
        image: "/category-media/soap-stampers/hrd-stamper.png",
      },
    ],
    importanceTitle: "Why Laundry Stamping Setup Matters",
    importanceDescription:
      "High-volume laundry lines need strong mechanical repeatability and stable bar handling to maintain output and branding quality.",
    importanceItems: [
      "Dual-side stamping for rectangular bars",
      "High-throughput continuous operation",
      "Stable feeding and synchronized ejection",
      "Reduced sticking through cooled punch design",
    ],
    detailTitle: "Brit Soap Laundry Stamper",
    detailParagraphs: [
      "The system uses a durable rotary die assembly with synchronized transfer for continuous industrial output.",
      "Cooling arrangements and die material design support clean release and better emboss clarity.",
      "Parallel feed strategy improves throughput while preserving bar geometry and alignment.",
    ],
    detailImage: "/category-media/soap-stampers/laundry-stamper.png",
    applicationTitle: "Application In Production",
    applicationDescription:
      "Designed for high-volume laundry and rectangular soap production lines where output stability and consistent bar definition are essential.",
    capacities: ["4 stations x 2 cavities architecture", "2 soaps per stroke"],
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