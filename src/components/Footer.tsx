import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Red accent line at top */}
      <div className="h-1 bg-accent" />
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-accent rounded-full" />
              <h3 className="text-lg font-bold uppercase tracking-wider">BritSoap</h3>
            </div>
            <p className="text-primary-foreground/60 text-xs leading-relaxed">
              Precision-engineered soap & detergent machinery. A joint venture between Britannia Soap Machinery Ltd (England) and Orum Engineering Pvt Ltd (India).
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[{ name: "About Us", path: "/about" }, { name: "Services", path: "/services" }, { name: "Products", path: "/products" }, { name: "Contact", path: "/contact" }].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4">Products</h4>
            <ul className="space-y-2">
              {["Saponification", "Drying", "Finishing Line", "Wrapping", "Pneumatic Transport", "Detergent Plants"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-xs text-primary-foreground/60">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                <span>BritSoap Machinery Pvt. Ltd., India</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-primary-foreground/60">
                <Phone size={14} className="shrink-0 text-accent" />
                <span>+91 XXXX XXXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-primary-foreground/60">
                <Mail size={14} className="shrink-0 text-accent" />
                <span>info@britsoap.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-primary-foreground/40 uppercase tracking-wider">
            © {new Date().getFullYear()} BritSoap Machinery Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-primary-foreground/40 uppercase tracking-wider">Designed in England</span>
            <span className="text-[10px] text-primary-foreground/40 uppercase tracking-wider">Manufactured in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
