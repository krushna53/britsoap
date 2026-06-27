"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User } from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/xykqwadl";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

export default function ContactClient({ contact }: any) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
              Get in Touch
            </span>
            <div className="w-8 h-0.5 bg-accent" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">Get In Touch</h2>
                <p className="text-base text-muted-foreground">
                  Reach out to us for product enquiries, quotes, or technical support.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                    <User size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-0.5 uppercase tracking-wider">
                      Contact Person
                    </h4>
                    <p className="text-base text-muted-foreground font-medium">
                      Mrs. Radhika Mehta
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-0.5 uppercase tracking-wider">
                      Address
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Unit No. 4B, Garodiya Industrial Estate, Plot 3A, off Swami Vivekanand Road,
                      Udyog Nagar, Goregaon West, Mumbai, Maharashtra 400104
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-0.5 uppercase tracking-wider">
                      Tel
                    </h4>
                    <div className="space-y-0.5">
                      <a href="tel:+910222868519" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                        +91 022 28685199
                      </a>
                      <a href="tel:+910222869316" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                        +91 022 28693162
                      </a>
                      <a href="tel:+919769466349" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                        +91 9769466349
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-primary-foreground" />
                  </div>
                  <div>
