"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ContactClient({ contact }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">
                  {contact?.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {contact?.description &&
                    documentToReactComponents(contact.description)}
                </p>
              </div>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: contact?.address,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: contact?.phone,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: contact?.email,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-primary flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary-foreground" />
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-0.5 uppercase tracking-wider">
                        {label}
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        {value || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
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
                    Your message has been sent. We'll get back to you shortly.
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
                          className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                      className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                      className="w-full px-4 py-2.5 rounded border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground text-sm font-medium rounded hover:bg-red-light transition-colors"
                  >
                    <Send size={14} />
                    Send Message
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
