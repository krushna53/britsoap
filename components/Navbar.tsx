"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = {
  name: string;
  path?: string;
  submenu?: {
    name: string;
    path: string;
  }[];
};
const navLinks: NavLink[] = [
  { name: "Home", path: "" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  {
    name: "Products",
    submenu: [
      {
        name: "Double Sigma Mixer",
        path: "/double-arm-sigma-mixer-soap-manufacturing",
      },
      {
        name: "Simplex Refiner Plodder",
        path: "/simplex-refiner-plodder",
      },
      {
        name: "Triple Roll Mill",
        path: "/triple-roll-mill-soap-refining-machine",
      },
      {
        name: "Duplex Vacuum Plodder",
        path: "/duplex-vacuum-soap-plodder-machine",
      },
    ],
  },
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
        
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="w-1 h-6 bg-accent rounded-full" />
          <span className="text-xl font-heading font-bold text-primary tracking-tight uppercase">
            BritSoap
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <div key={i} className="relative group">
              {!link.submenu && link.path && (
                <Link
                  href={`/${lang}${link.path}`}
                  className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )}
              {link.submenu && (
                <>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground cursor-pointer hover:text-primary">
                    {link.name}
                  </span>

                  <div className="absolute left-0 top-full mt-4 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.submenu.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={`/${lang}${sub.path}`}
                        className="block px-4 py-3 text-sm hover:bg-muted transition"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
        <Link
          href={`/${lang}/contact`}
          className="hidden md:inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-xs font-medium rounded hover:bg-red-light transition-colors uppercase tracking-wider"
        >
          Get a Quote
        </Link>
        <LanguageSwitcher />
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <nav className="container flex flex-col gap-4 py-6">
              {navLinks.map((link, i) => (
                <div key={i}>
                  {link.path && (
                    <Link
                      href={`/${lang}${link.path}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.submenu && (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        {link.name}
                      </span>

                      {link.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={`/${lang}${sub.path}`}
                          onClick={() => setMobileOpen(false)}
                          className="pl-4 text-xs text-muted-foreground"
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={`/${lang}/contact`}
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
