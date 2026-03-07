"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { name: "Home", path: "" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/simplex-soap-refining-plodder-machine" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const lang = pathname.split("/")[1] || "en";

  const isActive = (path: string) => {
    return pathname === `/${lang}${path}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">

        {/* ✅ Logo FIX */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <span className="text-xl font-heading font-bold text-primary tracking-tight uppercase">
            BritSoap
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={`/${lang}${link.path}`}
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                isActive(link.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ✅ CTA FIX */}
        <Link
          href={`/${lang}/contact`}
          className="hidden md:inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-xs font-medium rounded hover:bg-red-light transition-colors uppercase tracking-wider"
        >
          Get a Quote
        </Link>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <nav className="container flex flex-col gap-4 py-6">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={`/${lang}${link.path}`} // ✅ FIXED
                  onClick={() => setMobileOpen(false)}
                  className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href={`/${lang}/contact`} // ✅ FIXED
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2 bg-accent text-accent-foreground text-xs font-medium rounded hover:bg-red-light transition-colors uppercase tracking-wider"
              >
                Get a Quote
              </Link>

              <LanguageSwitcher />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;