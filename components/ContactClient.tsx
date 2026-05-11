"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User } from "lucide-react";

const CONTACT_INFO = {
  person: "Mrs. Radhika Mehta",
  address:
    "Unit No 12, Kotkar Industrial Estate, Off Aarey Road, Goregaon East, Mumbai 400 063, India",
  phones: ["+91 022 28685199", "+91 022 28693162", "+91 9769466349"],
  email: "britsoap@gmail.com",
};

// Put your deployed Google Apps Script Web App URL here
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSW7vkPsQpHT-AhsuFlR5ZNc3wyLW8VaJjwCe6ytLXUXeYDG8trktq4s_Rt3Ad__cM_g/exec";

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

    if (!GOOGLE_APPS_SCRIPT_URL) {
      setError("Form endpoint is missing. Set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        // text/plain avoids unnecessary preflight issues with Apps Script
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      // Apps Script may return JSON or plain text depending on your doPost
      const rawText = await res.text();

      let responseData: any = null;
      try {
        responseData = rawText ? JSON.parse(rawText) : null;
      } catch {
        responseData = null;
      }

      if (!res.ok) {
        throw new Error(
          responseData?.message ||
            responseData?.error ||
            "Failed to send message. Please try again."
        );
      }

      if (
        responseData &&
        responseData.success === false
      ) {
        throw new Error(
          responseData.message || "Failed to send message. Please try again."
        );
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
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
                <h2 className="text-2xl font-bold text-primary mb-1">
                  Get In Touch
                </h2>
                <p className="text-sm text-muted-foreground">
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
                    <p className="text-sm text-muted-foreground font-medium">
                      {CONTACT_INFO.person}
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
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {CONTACT_INFO.address}
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
                      {CONTACT_INFO.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-0.5 uppercase tracking-wider">
                      Email
                    </h4>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="p-12 rounded border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <Send size={20} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Your message has been sent successfully. We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded border border-border space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        name: "name",
                        label: "Full Name *",
                        type: "text",
                        placeholder: "John Doe",
                        required: true,
                      },
                      {
                        name: "email",
                        label: "Email *",
                        type: "email",
                        placeholder: "john@company.com",
                        required: true,
                      },
                      {
                        name: "phone",
                        label: "Phone",
                        type: "tel",
                        placeholder: "+91 XXXX XXXXXX",
                        required: false,
                      },
                      {
                        name: "company",
                        label: "Company",
                        type: "text",
                        placeholder: "Your Company",
                        required: false,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="text-xs font-medium text-foreground mb-1.5 block uppercase tracking-wider">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={(formData as any)[field.name]}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block uppercase tracking-wider">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="product">Product Enquiry</option>
                      <option value="service">Service & Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {error && <p className="text-xs text-red-500">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground text-sm font-medium rounded hover:bg-red-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}