/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"],
  },
  async redirects() {
    return [
      { source: "/index.htm", destination: "/", permanent: true },
      { source: "/profile.htm", destination: "/about", permanent: true },
      { source: "/contactus.htm", destination: "/contact", permanent: true },
      { source: "/clientlist.htm", destination: "/about", permanent: true },
      { source: "/cutter.htm", destination: "/soap-cutters", permanent: true },
      { source: "/drying.htm", destination: "/products/drying-line", permanent: true },
      { source: "/soapdrying.htm", destination: "/products/drying-line", permanent: true },
      { source: "/duplexplodder.htm", destination: "/duplex-vacuum-soap-plodder-machine", permanent: true },
      { source: "/simpexplodder.htm", destination: "/simplex-refiner-plodder", permanent: true },
      { source: "/rollmill.htm", destination: "/triple-roll-mill-soap-refining-machine", permanent: true },
      { source: "/finishing.htm", destination: "/products/finishing-line", permanent: true },
      { source: "/saponification.htm", destination: "/products/saponification", permanent: true },
      { source: "/jet.htm", destination: "/products/saponification/saponification-jet", permanent: true },
      { source: "/heatexchanger.htm", destination: "/products/drying-line/soap-heat-exchanger", permanent: true },
      { source: "/powderseparaters.htm", destination: "/products/drying-line/powder-separator", permanent: true },
      { source: "/vaccumbooster.htm", destination: "/products/drying-line/vacuum-drying-system", permanent: true },
      { source: "/universal.htm", destination: "/products/soap-stampers/rotary-soap-stamper", permanent: true },
      { source: "/coolingunits.htm", destination: "/services", permanent: true },
      { source: "/electriccontrol.htm", destination: "/services", permanent: true },
      { source: "/soapdelivery.htm", destination: "/services", permanent: true },
    ];
  },
};

module.exports = nextConfig;