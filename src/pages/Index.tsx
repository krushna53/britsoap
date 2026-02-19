import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Settings, Globe, Shield, Wrench, Factory, Cog } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-machinery.jpg";
import saponificationImg from "@/assets/product-saponification.jpg";
import dryingImg from "@/assets/product-drying.jpg";
import finishingImg from "@/assets/product-finishing.jpg";
import aboutImg from "@/assets/about-factory.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function Counter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary-foreground">
        {count}{suffix}
      </div>
      <div className="w-8 h-0.5 bg-accent mx-auto mt-3 mb-2" />
      <p className="text-sm text-primary-foreground/70 uppercase tracking-widest">{label}</p>
    </div>
  );
}

const featuredProducts = [
  { name: "Saponification Plant", image: saponificationImg },
  { name: "Drying Systems", image: dryingImg },
  { name: "Finishing Line", image: finishingImg },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero — Full screen indigo overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-0.5 bg-accent" />
              <span className="text-accent text-xs font-semibold uppercase tracking-[0.3em]">
                Engineered for Performance
              </span>
              <div className="w-10 h-0.5 bg-accent" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto">
              Complete Soap Plants
            </motion.h1>
            <motion.p variants={fadeUp} className="text-primary-foreground/60 text-lg mt-4 max-w-lg mx-auto">
              Saponification to Wrapping. Installation &amp; Commissioning.
            </motion.p>
            <motion.p variants={fadeUp} className="text-primary-foreground/50 text-sm mt-2">
              Designed in England · Manufactured in India
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-primary-foreground/30 text-primary-foreground font-medium rounded hover:bg-primary-foreground/10 transition-colors text-sm"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
        {/* Scroll down indicator */}
        <a href="#featured" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50 animate-scroll-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Our Products</span>
              <div className="w-8 h-0.5 bg-accent" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary">
              Precision Machinery
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Link to="/products" className="group block">
                  <div className="overflow-hidden rounded border border-border">
                    <img src={product.image} alt={product.name} className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-accent" />
                    <h3 className="text-base font-semibold text-primary group-hover:text-indigo-light transition-colors">{product.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/products" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-indigo-light transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <img src={aboutImg} alt="BritSoap Factory" className="rounded w-full h-80 lg:h-[400px] object-cover" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">About BritSoap</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold text-primary mb-6">
                Engineering Excellence
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6 text-sm">
                BritSoap is a joint venture between Britannia Soap Machinery Ltd of England and Orum Engineering Pvt Ltd of India. We design, manufacture, and install complete soap plants with world-class precision.
              </motion.p>
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                {[
                  { icon: Settings, text: "Tailor-made plants" },
                  { icon: Globe, text: "Global service" },
                  { icon: Shield, text: "Best quality" },
                  { icon: Wrench, text: "Full support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8">
                <Link to="/about" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-indigo-light transition-colors">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Counter — Deep indigo */}
      <section className="py-24 bg-primary">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">Our Impact</span>
              <div className="w-8 h-0.5 bg-accent" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Trusted Globally
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter target={25} suffix="+" label="Countries" />
            <Counter target={150} suffix="+" label="Installed Plants" />
            <Counter target={40} suffix="+" label="Years Experience" />
            <Counter target={500} suffix="+" label="Clients Served" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Services</span>
              <div className="w-8 h-0.5 bg-accent" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary">
              What We Do
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: "Plant Design", desc: "Complete soap plant design from saponification to packaging, tailored to your production needs." },
              { icon: Cog, title: "Installation", desc: "On-site installation, commissioning, and startup support by our expert engineering team." },
              { icon: Wrench, title: "After-Sales", desc: "Comprehensive maintenance, spare parts, and technical support for long-term reliability." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-8 border border-border rounded hover:border-primary/30 transition-colors"
              >
                <Icon size={28} className="text-primary mb-4" />
                <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with red accent */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Build Your Soap Plant?</h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">
            Get in touch with our team for a custom proposal.
          </p>
          <Link to="/contact" className="inline-flex items-center px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
