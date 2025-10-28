export const filterData = {
  brands: [
    "Rolex",
    "Patek Philippe",
    "Vacheron Constantin",
    "Audemars Piguet",
    "Omega",
    "Tudor",
    "Cartier",
  ],

  conditions: ["new", "excellent", "used"],

  mechanisms: ["mechanical", "quartz", "kinetic", "automatic", "springDrive"],

  materials: ["gold", "silver", "titanium", "ceramic"],

  documents: ["fullSet"],

  locations: ["europe", "asia", "america"],

  indexButtons: ["A", "B", "C"] as const,

  sections: [
    "brand",
    "price",
    "index",
    "condition",
    "mechanism",
    "material",
    "year",
    "documents",
    "location",
  ] as const,
};

export type IndexButton = (typeof filterData.indexButtons)[number];
export type FilterSection = (typeof filterData.sections)[number];
