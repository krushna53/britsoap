import crutcherImg from "@/assets/about-factory.jpg";
import jetImg from "@/assets/about-factory.jpg";
import condenserImg from "@/assets/about-factory.jpg";
import mixerImg from "@/assets/about-factory.jpg";

export const machines = [
  {
    category: "Saponification",
    categorySlug: "saponification",
    slug: "crutcher",
    name: "Crutcher",
    image: crutcherImg,
    description: `
A Crutcher is the main reaction vessel in the semi-boiled saponification process,
or simply a mixing vessel in the soap modification process.

It can be used to make a wide variety of soaps or for mixing additives
and fillers into liquid soap. Crutchers are very easy to use and are generally
found in laundry soap factories.

They are also used in more sophisticated plants,
such as for making transparent soap.
    `,
  },
  {
    category: "Saponification",
    categorySlug: "saponification",
    slug: "saponification-jet",
    name: "Saponification Jet",
    image: jetImg,
    description: `
The Saponification Jet is a simple instant saponification device used for
continuous soap production. It has no moving parts and uses motive steam
as the energy source.

Only 100 kgs of steam per tonne of soap is required. The Jet can be adjusted
for soap outputs from 1 to 10 tonnes per hour.

The unit operates by driving 5 bar motive steam through an internal
venturi jet to create a vacuum. This draws in caustic liquor and oils,
where they meet in the presence of steam and produce instantaneous
saponification.

Around 90% reacted neat soap is discharged directly from the Jet.

The unit is precision machined from stainless steel, carefully assembled,
and designed for high tolerance and long service life.

It is compact, energy efficient, easy to install, and suitable for a wide
range of raw materials.
    `,
  },
  {
    category: "Drying",
    categorySlug: "drying",
    slug: "condenser",
    name: "Condenser",
    image: condenserImg,
    description: `
The Britannia water-cooled direct contact type gas condenser efficiently deals
with hot gases liberated from drying soap and steam operated vacuum booster.

Hot gases are cooled and therefore their volume is substantially reduced.
This reduces the gas load on the vacuum pump and saves energy.

The design ensures all condensables are converted to liquid
and non-condensable gases are reduced to minimum volume.
    `,
  },
  {
    category: "Finishing",
    categorySlug: "finishing",
    slug: "mixer",
    name: "Mixer",
    image: mixerImg,
    description: `
The Britannia Mixer effectively combines liquid, powder or solid
constituents of a soap formula with speed and effectiveness.

We offer a range of blade designs for natural or synthetic toilet
or laundry soaps as noodle, flake or ribbon.

The machine can be either bottom discharge or tilting type.
    `,
  },
];
