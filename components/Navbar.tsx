"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

type SubItem = {
  name: string;
  path: string;
};

type Category = {
  category: string;
  items: SubItem[];
};

type NavLink = {
  name: string;
  path?: string;
  megaMenu?: {
    searchable?: boolean;
    columns: Category[];
  };
};

const navLinks: NavLink[] = [
  { name: "Home", path: "" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  {
    name: "Products",
    megaMenu: {
      searchable: true,
      columns: [
        {
          category: "Mixing Equipment",
          items: [
            { name: "Double Sigma Mixer", path: "/double-arm-sigma-mixer-soap-manufacturing" },
          ],
        },
        {
          category: "Refining & Plodding",
          items: [
            { name: "Simplex Refiner Plodder", path: "/simplex-refiner-plodder" },
            { name: "Duplex Vacuum Plodder", path: "/duplex-vacuum-soap-plodder-machine" },
            { name: "Triple Roll Mill", path: "/triple-roll-mill-soap-refining-machine" },
          ],
        },
        {
          category: "Finishing Line",
          items: [
            { name: "Soap Cutters", path: "/soap-cutters" },
            { name: "AV Pneumatic Cutter", path: "/av-pneumatic-soap-cutter-machine"},
            {name: "HSB Cutter", path:"/high-speed-soap-cutter-machine"}
          ],
        },
      ],
    },
  },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const lang = pathname.split("/")[1] || "en";

  const isActive = (path: string) => pathname === `/${lang}${path}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Brit Soap"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <div key={i} className="relative group">
              {/* Regular link */}
              {!link.megaMenu && link.path !== undefined && (
                <Link
                  href={`/${lang}${link.path}`}
                  className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Mega menu trigger */}
              {link.megaMenu && (
                <>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground cursor-pointer hover:text-primary select-none">
                    {link.name}
                  </span>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[780px] bg-[#1e2a38] text-white shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">

                    {/* Columns */}
                    <div className="grid grid-cols-3 gap-0 p-2">
                      {link.megaMenu.columns.map((col, ci) => (
                        <div
                          key={ci}
                          className="p-4 border-r border-white/10 last:border-r-0"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white mb-3 pb-2 border-b border-white/20">
                            {col.category}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {col.items.map((item, ii) => (
                              <li key={ii}>
                                <Link
                                  href={`/${lang}${item.path}`}
                                  className="block text-[13px] text-white/70 hover:text-white hover:translate-x-1 transition-all duration-150 py-1"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Language */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-xs font-medium rounded hover:bg-red-light transition-colors uppercase tracking-wider"
          >
            Get a Quote
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                  {/* Regular mobile link */}
                  {!link.megaMenu && link.path !== undefined && (
                    <Link
                      href={`/${lang}${link.path}`}
                      onClick={() => setMobileOpen(false)}
                      className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Mobile mega menu as accordion */}
                  {link.megaMenu && (
                    <div>
                      <button
                        className="w-full text-left text-xs font-medium uppercase tracking-[0.2em] text-primary flex justify-between items-center"
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.name ? null : link.name
                          )
                        }
                      >
                        {link.name}
                        <span>{mobileExpanded === link.name ? "−" : "+"}</span>
                      </button>

                      <AnimatePresence>
                        {mobileExpanded === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {link.megaMenu.columns.map((col, ci) => (
                              <div key={ci} className="mt-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                  {col.category}
                                </p>
                                {col.items.map((item, ii) => (
                                  <Link
                                    key={ii}
                                    href={`/${lang}${item.path}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block pl-3 py-1 text-xs text-muted-foreground hover:text-primary"
                                  >
                                    • {item.name}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
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