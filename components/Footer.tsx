"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";

  const productLinks = [
    { name: "Saponification", path: "/products/saponification" },
    { name: "Drying", path: "/products/drying-line" },
    { name: "Finishing Line", path: "/products/finishing-line" },
    { name: "Soap Cutters", path: "/soap-cutters" },
    { name: "Soap Stampers", path: "/products/soap-stampers" },
    { name: "Wrapping", path: null },
    { name: "Pneumatic Transport", path: null },
    { name: "Detergent Plants", path: null },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Red accent line at top */}
      <div className="h-1 bg-accent" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-accent rounded-full" />

              <h3 className="text-lg font-bold capitalize tracking-wider">
                BritSoap
              </h3>
            </div>

            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Precision-engineered soap & detergent machinery. A joint venture
              between Britannia Soap Machinery Ltd (England) and Orum
              Engineering Pvt Ltd (India).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold capitalize tracking-[0.2em] mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Products", path: "/products" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={`/${lang}${link.path}`}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors capitalize"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold capitalize tracking-[0.2em] mb-4">
              Products
            </h4>

            <ul className="space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  {item.path ? (
                    <Link
                      href={`/${lang}${item.path}`}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors capitalize"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-primary-foreground/40 cursor-default capitalize">
                      {item.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold capitalize tracking-[0.2em] mb-4">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />

                <span>
                  Unit No 12, Kotkar Industrial Estate, Off Aarey Road,
                  Goregaon East, Mumbai 400063, India
                </span>
              </li>

              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />

                <div className="space-y-1">
                  <a
                    href="tel:+912228685199"
                    className="block hover:text-primary-foreground transition-colors"
                  >
                    +91 022 28685199
                  </a>

                  <a
                    href="tel:+912228693162"
                    className="block hover:text-primary-foreground transition-colors"
                  >
                    +91 022 28693162
                  </a>

                  <a
                    href="tel:+919769466349"
                    className="block hover:text-primary-foreground transition-colors"
                  >
                    +91 9769466349
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Mail size={16} className="shrink-0 text-accent" />

                <a
                  href="mailto:britsoap@gmail.com"
                  className="hover:text-primary-foreground transition-colors"
                >
                  britsoap@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-primary-foreground/40 uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} BritSoap Machinery Pvt. Ltd. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="text-[13px] text-primary-foreground/40 uppercase tracking-wider">
              Designed in England
            </span>

            <span className="text-[13px] text-primary-foreground/40 uppercase tracking-wider">
              Manufactured in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;