import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import saponificationImg from "@/assets/product-saponification.jpg";
import dryingImg from "@/assets/product-drying.jpg";
import finishingImg from "@/assets/product-finishing.jpg";
import transportImg from "@/assets/product-transport.jpg";
import wrappingImg from "@/assets/product-wrapping.jpg";
import detergentImg from "@/assets/product-detergent.jpg";

const products = [
  { name: "Saponification Plant", desc: "Complete saponification systems for batch and continuous processing with uniform quality and efficient production.", image: saponificationImg, features: ["Batch & Continuous", "Stainless Steel", "Automated Controls", "High Capacity"] },
  { name: "Drying Systems", desc: "Advanced vacuum and atmospheric drying systems for optimal moisture content while preserving soap quality.", image: dryingImg, features: ["Vacuum Drying", "Energy Efficient", "Precise Control", "Low Maintenance"] },
  { name: "Finishing Line", desc: "Complete finishing lines including amalgamators, roll mills, plodders, and stampers for high-quality soap bars.", image: finishingImg, features: ["Roll Mills", "Duplex Plodders", "Stamping Machines", "Conveyors"] },
  { name: "Pneumatic Transport", desc: "Efficient pneumatic conveying systems for moving soap noodles, powder, and granules between stages.", image: transportImg, features: ["Dust-Free", "Flexible Routing", "Low Energy", "Easy Maintenance"] },
  { name: "Wrapping & Packaging", desc: "High-speed wrapping machines and packaging solutions for attractive presentation and product protection.", image: wrappingImg, features: ["High Speed", "Multiple Formats", "Quick Changeover", "Precision"] },
  { name: "Detergent Plants", desc: "Complete powder and liquid detergent manufacturing plants with mixing, drying, and packaging.", image: detergentImg, features: ["Powder & Liquid", "Spray Drying", "Mixing Systems", "Auto Dosing"] },
];

const Products = () => (
  <Layout>
    <section className="py-20 bg-primary">
      <div className="container text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">Our Products</span>
          <div className="w-8 h-0.5 bg-accent" />
        </div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-primary-foreground">Industrial Machinery</motion.h1>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container space-y-24">
        {products.map((product, i) => (
          <motion.div key={product.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative">
                <img src={product.image} alt={product.name} className="rounded w-full h-72 lg:h-80 object-cover" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
              </div>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-0.5 bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{product.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{product.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-xs text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center px-6 py-2.5 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-indigo-light transition-colors uppercase tracking-wider">
                Enquire Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-20 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">Can't Find What You Need?</h2>
        <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">We design custom machinery solutions. Contact us to discuss your requirements.</p>
        <Link to="/contact" className="inline-flex px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm">Get in Touch</Link>
      </div>
    </section>
  </Layout>
);

export default Products;
