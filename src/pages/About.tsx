import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Shield, Lightbulb, Globe, Award } from "lucide-react";
import Layout from "@/components/Layout";
import aboutImg from "@/assets/about-factory.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const values = [
  { icon: Award, title: "Engineering Excellence", desc: "Precision-built machinery meeting international standards." },
  { icon: Shield, title: "Durability & Strength", desc: "Built to last with robust materials and rigorous QC." },
  { icon: Target, title: "Trust & Integrity", desc: "Transparent partnerships built on decades of reliability." },
  { icon: Lightbulb, title: "Innovation", desc: "Continuously advancing technology for better performance." },
  { icon: Globe, title: "Global Service", desc: "Serving clients across 25+ countries worldwide." },
  { icon: Eye, title: "Customer Focus", desc: "Tailored solutions designed around your requirements." },
];

const About = () => (
  <Layout>
    <section className="py-20 bg-primary">
      <div className="container text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">About Us</span>
            <div className="w-8 h-0.5 bg-accent" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-primary-foreground">Who We Are</motion.h1>
        </motion.div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <img src={aboutImg} alt="BritSoap Factory" className="rounded w-full h-96 object-cover" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-primary mb-6">A Joint Venture Built on Excellence</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4 text-sm">
              BritSoap Machinery Pvt. Ltd. is a joint venture between Britannia Soap Machinery Ltd of England and Orum Engineering Pvt Ltd of India. We combine British engineering expertise with Indian manufacturing capability.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-4 text-sm">
              We specialize in the design, manufacture, and installation of complete soap plants — from saponification to wrapping. Our commitment to quality and competitive pricing has made us a trusted partner worldwide.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed text-sm">
              With over 40 years of combined experience and installations in 25+ countries, we set the standard in performance, reliability, and innovation.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-surface">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 bg-background rounded border-l-4 border-accent">
            <h3 className="text-lg font-bold text-primary mb-3">Our Vision</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To deliver high-quality industrial machinery with precision engineering and global reliability.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="p-10 bg-background rounded border-l-4 border-primary">
            <h3 className="text-lg font-bold text-primary mb-3">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To provide end-to-end soap plant solutions with cutting-edge technology, competitive pricing, and unwavering customer satisfaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Our Values</span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary">What Drives Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-8 rounded border border-border hover:border-primary/30 transition-colors">
              <Icon size={24} className="text-accent mb-4" />
              <h3 className="text-base font-semibold text-primary mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">Partner With Us</h2>
        <p className="text-primary-foreground/60 max-w-md mx-auto mb-8 text-sm">Let's discuss how BritSoap can build your next soap manufacturing plant.</p>
        <Link to="/contact" className="inline-flex px-10 py-3 bg-accent text-accent-foreground font-medium rounded hover:bg-red-light transition-colors text-sm">Contact Us</Link>
      </div>
    </section>
  </Layout>
);

export default About;
