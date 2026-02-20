import crutcherImg from "@/assets/crutcher.jpg";
import condenserImg from "@/assets/condenser.jpg";
import mixerImg from "@/assets/mixer.jpg";

export const products = [
  {
    category: "Saponification",
    categorySlug: "saponification",
    machines: [
      {
        slug: "crutcher",
        name: "Crutcher",
        image: crutcherImg,
        description: `
A Crutcher is the main reaction vessel in the semi-boiled saponification process.

It can be used to make a wide variety of soaps or for mixing additives
and fillers into liquid soap.

Crutchers are easy to use and are generally found in laundry soap factories.
        `,
        features: [
          "Heavy Duty Construction",
          "High Efficiency Mixing",
          "Custom Capacity",
          "Industrial Grade Motor",
        ],
      },
    ],
  },
  {
    category: "Drying",
    categorySlug: "drying",
    machines: [
      {
        slug: "condenser",
        name: "Condenser",
        image: condenserImg,
        description: `
The Britannia water cooled gas condenser deals efficiently
with hot gases liberated from drying soap.

Hot gases are cooled and volume reduced,
reducing vacuum pump load and saving energy.
        `,
        features: [
          "Energy Efficient",
          "Water Cooled",
          "Vacuum Compatible",
          "Low Maintenance",
        ],
      },
    ],
  },
  {
    category: "Finishing",
    categorySlug: "finishing",
    machines: [
      {
        slug: "mixer",
        name: "Mixer",
        image: mixerImg,
        description: `
The Britannia Mixer combines liquid, powder or solid
constituents of a soap formula with speed and efficiency.

Available in bottom discharge or tilting type.
        `,
        features: [
          "Bottom Discharge",
          "Tilting Type",
          "Multiple Blade Options",
          "Heavy Duty Gearbox",
        ],
      },
    ],
  },
];
