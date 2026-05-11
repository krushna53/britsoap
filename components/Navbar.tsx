"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

type SubItem = {
  name: string;
  path: string;
};

type Category = {
  category: string;
  path?: string;
  items: SubItem[];
  subcategories?: {
    category: string;
    path?: string;
    items: SubItem[];
  }[];
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
          category: "Saponification",
          path: "/products/saponification",
          items: [
            { name: "Saponification Crutcher", path: "/products/saponification/saponification-crutcher-soap-manufacturing" },
            { name: "Saponification Jet", path: "/products/saponification/saponification-jet" },
          ],
        },
        {
          category: "Drying Line",
          path: "/products/drying-line",
          items: [
            { name: "Heat Exchanger", path: "/products/drying-line/soap-heat-exchanger" },
            { name: "Powder Separator", path: "/products/drying-line/powder-separator" },
            { name: "Vacuum Drying System", path: "/products/drying-line/vacuum-drying-system" },
            { name: "Atomiser / Vacuum Spray Chamber", path: "/products/drying-line/soap-atomiser" },
          ],
        },
        {
          category: "Finishing Line",
          path: "/products/finishing-line",
          items: [
            { name: "Double Sigma Mixer", path: "/double-arm-sigma-mixer-soap-manufacturing" },
            { name: "Refiner Plodders", path: "/simplex-refiner-plodder" },
            { name: "Triple Roll Mill", path: "/triple-roll-mill-soap-refining-machine" },
            { name: "Duplex Vacuum Plodder", path: "/duplex-vacuum-soap-plodder-machine" },
          ],
        },
        {
          category: "Soap Cutters",
          path: "/soap-cutters",
          items: [
            { name: "AV Pneumatic Cutter", path: "/av-pneumatic-soap-cutter-machine" },
            { name: "HSB Cutter", path: "/high-speed-soap-cutter-machine" },
          ],
        },
        {
          category: "Soap Stampers",
          path: "/products/soap-stampers",
          items: [
            { name: "Manual Pneumatic Stamper", path: "/products/soap-stampers/manual-pneumatic-soap-stamper" },
            { name: "HRD Soap Stamper", path: "/products/soap-stampers/hrd-soap-stamper" },
            { name: "Rotary Soap Stamper", path: "/products/soap-stampers/rotary-soap-stamper" },
            { name: "Vertical Soap Stamper", path: "/products/soap-stampers/vertical-soap-stamper" },
            { name: "Six-Face Soap Stamper", path: "/products/soap-stampers/six-face-soap-stamper" },
            { name: "Laundry Soap Stamper", path: "/products/soap-stampers/laundry-soap-stamper" },
          ],
        },
      ],
    },
  },
  {name:"Video", path: "https://www.youtube.com/@BritsoapMachinery"},
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  

  const isActive = (path: string) => pathname === (path === "" ? "/" : path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href={`/`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Brit Soap"
            width={180}
            height={40}
            priority
            className="object-contain  w-[120px] md:w-[180px] h-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <div key={i} className="relative group">
              {/* Regular link */}
              {!link.megaMenu && link.path !== undefined && (
                link.path.startsWith("http") ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium capitalize tracking-[0.15em] transition-colors hover:text-primary text-muted-foreground"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.path}
                    className={`text-base font-medium capitalize tracking-[0.15em] transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {link.name}
                  </Link>
                )
              )}

              {/* Mega menu trigger */}
              {link.megaMenu && (
                <>
                  <span className="text-base font-medium capitalize tracking-[0.15em] text-muted-foreground cursor-pointer hover:text-primary select-none">
                    {link.name}
                  </span>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[1100px] bg-white border border-border shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">

                    {/* Columns */}
                    <div className="grid grid-cols-5 gap-0 p-2">
                      {link.megaMenu.columns.map((col, ci) => (
                        <div
                          key={ci}
                          className="p-4 border-r border-border last:border-r-0"
                        >
                          {col.path ? (
                            <Link href={col.path} className="block text-xs font-bold capitalize tracking-[0.15em] text-primary mb-3 pb-2 border-b border-border hover:text-accent transition-colors">
                              {col.category}
                            </Link>
                          ) : (
                            <p className="text-xs font-bold capitalize tracking-[0.15em] text-primary mb-3 pb-2 border-b border-border">
                              {col.category}
                            </p>
                          )}
                          <div className="flex flex-col gap-1">
                            {col.items.map((item, ii) => (
                              <Link
                                key={ii}
                                href={item.path}
                                className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-150 py-1"
                              >
                                {item.name}
                              </Link>
                            ))}
                            {col.subcategories?.map((subCategory, si) => (
                              <div key={si} className="mt-2 pl-3 border-l border-border/70">
                                {subCategory.path ? (
                                  <Link
                                    href={subCategory.path}
                                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2 hover:text-accent transition-colors"
                                  >
                                    {subCategory.category}
                                  </Link>
                                ) : (
                                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                                    {subCategory.category}
                                  </p>
                                )}
                                <div className="flex flex-col gap-1">
                                  {subCategory.items.map((item, ii) => (
                                    <Link
                                      key={ii}
                                      href={item.path}
                                      className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-150 py-1"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
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
            href={`/contact`}
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
            className="md:hidden overflow-y-auto max-h-[calc(100vh-4rem)] bg-background border-b border-border"
          >
            <nav className="container flex flex-col gap-4 py-6">
              {navLinks.map((link, i) => (
                <div key={i}>
                  {/* Regular mobile link */}
                  {!link.megaMenu && link.path !== undefined && (
                    link.path.startsWith("http") ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm font-medium capitalize tracking-[0.15em] text-muted-foreground"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm font-medium capitalize tracking-[0.15em] text-muted-foreground"
                      >
                        {link.name}
                      </Link>
                    )
                  )}

                  {/* Mobile mega menu as accordion */}
                  {link.megaMenu && (
                    <div>
                      <button
                        className="w-full text-left text-sm font-medium capitalize tracking-[0.15em] text-primary flex justify-between items-center"
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
                                {col.path ? (
                                  <Link href={col.path} onClick={() => setMobileOpen(false)} className="block text-xs font-bold capitalize tracking-widest text-muted-foreground mb-1 hover:text-primary">
                                    {col.category}
                                  </Link>
                                ) : (
                                  <p className="text-xs font-bold capitalize tracking-widest text-muted-foreground mb-1">
                                    {col.category}
                                  </p>
                                )}
                                {col.items.map((item, ii) => (
                                  <Link
                                    key={ii}
                                    href={item.path}
                                    onClick={() => setMobileOpen(false)}
                                    className="block pl-3 py-1 text-sm text-muted-foreground hover:text-primary"
                                  >
                                    • {item.name}
                                  </Link>
                                ))}
                                {col.subcategories?.map((subCategory, si) => (
                                  <div key={si} className="mt-2 pl-3 border-l border-border/70">
                                    {subCategory.path ? (
                                      <Link
                                        href={subCategory.path}
                                        onClick={() => setMobileOpen(false)}
                                        className="block text-xs font-semibold uppercase tracking-widest text-primary mb-1 hover:text-accent"
                                      >
                                        {subCategory.category}
                                      </Link>
                                    ) : (
                                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                                        {subCategory.category}
                                      </p>
                                    )}
                                    {subCategory.items.map((item, ii) => (
                                      <Link
                                        key={ii}
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className="block pl-3 py-1 text-sm text-muted-foreground hover:text-primary"
                                      >
                                        • {item.name}
                                      </Link>
                                    ))}
                                  </div>
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
                href={`/contact`}
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