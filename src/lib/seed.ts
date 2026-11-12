import type {
  BrandPartnership,
  Product,
  ProductCategory,
  ProjectItem,
  SiteSettings,
} from "./types";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "GSM Solar Light",
  tagline: "Powering a Brighter, Sustainable Future.",
  city: "Mathura, Uttar Pradesh, India",
  address:
    "[Pending Client Confirmation] Complete Business Address, Mathura, Uttar Pradesh, India",
  phone: "+91-00000-00000",
  whatsapp: "910000000000",
  email: "enquiry@gsmsolarlight.example",
  mapsUrl: "https://maps.google.com/?q=Mathura,Uttar+Pradesh,India",
  heroOfferFreeConsultation: false,
  showGroundMountedSolar: false,
  showExecutionProcess: false,
  showProductPrices: false,
  gaMeasurementId: "",
  socialFacebook: "",
  socialInstagram: "",
  socialLinkedin: "",
};

export const SEED_CATEGORIES: ProductCategory[] = [
  {
    slug: "solar-panels",
    name: "Solar Panels",
    description:
      "Solar photovoltaic modules for residential, commercial and industrial solar installations.",
    imageUrl: "/images/cat-solar-panels.svg",
    sortOrder: 1,
  },
  {
    slug: "solar-inverters",
    name: "Solar Inverters",
    description:
      "Power conversion systems designed for rooftop and commercial solar energy setups.",
    imageUrl: "/images/cat-solar-inverters.svg",
    sortOrder: 2,
  },
  {
    slug: "solar-equipment-accessories",
    name: "Solar Equipment & Accessories",
    description:
      "Mounting hardware, protection devices and balance-of-system solar components.",
    imageUrl: "/images/cat-solar-accessories.svg",
    sortOrder: 3,
  },
  {
    slug: "lithium-ion-batteries",
    name: "Lithium-Ion Batteries",
    description:
      "Energy storage and lithium-ion battery solutions for solar, backup and mobility applications.",
    imageUrl: "/images/cat-lithium-battery.svg",
    sortOrder: 4,
  },
  {
    slug: "e-rickshaw-chargers",
    name: "E-rickshaw Chargers",
    description:
      "Dedicated charging solutions built for E-rickshaw fleet operators, dealers and individual owners.",
    imageUrl: "/images/cat-erickshaw-charger.svg",
    sortOrder: 5,
  },
  {
    slug: "other-power-products",
    name: "Other Power Products",
    description:
      "Wider power backup and energy products supplied for domestic, commercial and dealer requirements.",
    imageUrl: "/images/cat-power-products.svg",
    sortOrder: 6,
  },
];

export const SEED_BRANDS: Omit<BrandPartnership, "id">[] = [
  {
    slug: "mtek-power",
    name: "Mtek Power",
    relationshipType: "current_distributor",
    relationshipLabel: "Distributor",
    summary:
      "GSM Solar Light is a distributor for Mtek Power products, serving customers and dealers in Mathura and surrounding regions.",
    description:
      "We distribute selected Mtek Power products for residential, commercial and trade customers. Contact our team to confirm current stock availability, model range and approved technical documentation.",
    logoUrl: "/images/brand-mtek-placeholder.svg",
    catalogueUrl: "",
    note: "Official Mtek Power logo and approved product list to be uploaded by GSM Solar Light via the CMS.",
    isActive: true,
    sortOrder: 1,
  },
  {
    slug: "getsun-power",
    name: "Getsun Power",
    relationshipType: "current_distributor",
    relationshipLabel: "Distributor",
    summary:
      "GSM Solar Light distributes Getsun Power products, supporting customers and dealer enquiries with dependable supply.",
    description:
      "As a distributor for Getsun Power, GSM Solar Light helps customers and resellers source suitable power and solar products. Reach out to our sales team for confirmed product options and availability.",
    logoUrl: "/images/brand-getsun-placeholder.svg",
    catalogueUrl: "",
    note: "Official Getsun Power brand assets and approved product list to be uploaded by GSM Solar Light via the CMS.",
    isActive: true,
    sortOrder: 2,
  },
  {
    slug: "utl",
    name: "UTL",
    relationshipType: "previous_partnership",
    relationshipLabel: "Previous Distribution Partnership",
    summary:
      "GSM Solar Light has had a previous distribution partnership with UTL.",
    description:
      "Historically, GSM Solar Light worked with UTL under a previous distribution partnership. This background contributes to our team's familiarity with solar and power product distribution. Note: UTL is listed solely as a historical association and not as a current distributorship.",
    logoUrl: "/images/brand-utl-placeholder.svg",
    catalogueUrl: "",
    note: "Historical partnership reference only — do not present as an active distributorship unless confirmed.",
    isActive: true,
    sortOrder: 3,
  },
];

export const SEED_PRODUCTS: Omit<Product, "id" | "updatedAt">[] = [
  {
    slug: "solar-pv-modules-catalogue",
    name: "Solar Panels (Residential & Commercial Range)",
    categorySlug: "solar-panels",
    brandSlug: null,
    shortDescription:
      "Solar photovoltaic panels for rooftop installations up to 1 MW project requirements. Exact models and wattage options confirmed upon enquiry.",
    detailedDescription:
      "GSM Solar Light supplies solar panels suited for home rooftops, commercial buildings and industrial solar projects. Specific panel technologies, capacities and datasheets will be updated here once confirmed by GSM Solar Light.",
    specifications: [
      { label: "Application", value: "Residential, Commercial & Industrial Rooftop" },
      { label: "Model & Wattage", value: "Supplied on enquiry / Pending client spec upload" },
      { label: "Availability", value: "Mathura & regional supply" },
    ],
    applications: "Home rooftops, shops, offices, institutions, industrial sheds",
    priceDisplay: "",
    imageUrl: "/images/cat-solar-panels.svg",
    datasheetUrl: "",
    isFeatured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    slug: "solar-inverter-systems",
    name: "Solar Inverters",
    categorySlug: "solar-inverters",
    brandSlug: null,
    shortDescription:
      "Solar inverter solutions for home, commercial and industrial solar installations. Technical ratings available on request.",
    detailedDescription:
      "We supply solar inverters matched to project capacity and customer load needs. Exact inverter models, capacities and manufacturer datasheets can be managed directly in the CMS.",
    specifications: [
      { label: "Customer Segments", value: "Residential, Commercial & Industrial" },
      { label: "Models & Ratings", value: "Pending confirmed product list from GSM Solar Light" },
    ],
    applications: "Rooftop solar systems and power backup installations",
    priceDisplay: "",
    imageUrl: "/images/cat-solar-inverters.svg",
    datasheetUrl: "",
    isFeatured: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    slug: "solar-bos-equipment-accessories",
    name: "Solar Equipment & System Accessories",
    categorySlug: "solar-equipment-accessories",
    brandSlug: null,
    shortDescription:
      "Essential solar mounting, wiring and protection equipment for dependable solar installations.",
    detailedDescription:
      "Complete your solar setup with system accessories and balance-of-system components supplied through GSM Solar Light. Contact our team for item-wise availability.",
    specifications: [
      { label: "Category", value: "Solar Equipment & Accessories" },
      { label: "Specifications", value: "Confirmed per project / product enquiry" },
    ],
    applications: "Solar project installations and dealer supply",
    priceDisplay: "",
    imageUrl: "/images/cat-solar-accessories.svg",
    datasheetUrl: "",
    isFeatured: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    slug: "lithium-ion-battery-range",
    name: "Lithium-Ion Batteries",
    categorySlug: "lithium-ion-batteries",
    brandSlug: "mtek-power",
    shortDescription:
      "Lithium-ion battery solutions for energy storage, power backup and mobility applications.",
    detailedDescription:
      "GSM Solar Light supplies lithium-ion batteries suited to diverse energy storage and power applications, including products from our distribution partner brands. Exact capacities and compatibility details are confirmed by our team.",
    specifications: [
      { label: "Category", value: "Lithium-Ion Energy Storage" },
      { label: "Distribution Brands", value: "Includes selected partner offerings (confirm availability)" },
      { label: "Voltage / Ah Ratings", value: "Pending client specification sheet" },
    ],
    applications: "Solar storage, backup power, commercial and mobility uses",
    priceDisplay: "",
    imageUrl: "/images/cat-lithium-battery.svg",
    datasheetUrl: "",
    isFeatured: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    slug: "e-rickshaw-charger-solutions",
    name: "E-rickshaw Chargers",
    categorySlug: "e-rickshaw-chargers",
    brandSlug: "getsun-power",
    shortDescription:
      "Dedicated E-rickshaw chargers for operators, charging stations and dealers.",
    detailedDescription:
      "Reliable E-rickshaw charging equipment available for individual owners, fleet operators and resellers. Reach out to confirm compatible battery types, current ratings and stock.",
    specifications: [
      { label: "Target Buyers", value: "E-rickshaw owners, fleet operators & dealers" },
      { label: "Compatibility & Ratings", value: "Confirmed on enquiry / Pending client spec upload" },
    ],
    applications: "E-rickshaw charging, commercial fleet operations, dealer resale",
    priceDisplay: "",
    imageUrl: "/images/cat-erickshaw-charger.svg",
    datasheetUrl: "",
    isFeatured: true,
    isActive: true,
    sortOrder: 5,
  },
  {
    slug: "other-power-solutions-products",
    name: "Other Power Products",
    categorySlug: "other-power-products",
    brandSlug: null,
    shortDescription:
      "Additional power solutions and equipment sourced for residential, commercial and trade customers.",
    detailedDescription:
      "Beyond solar panels and batteries, GSM Solar Light supports customers and dealers with wider power products. Contact our sales team to check currently stocked lines.",
    specifications: [
      { label: "Availability", value: "Retail & dealer distribution enquiries welcome" },
      { label: "Product Details", value: "Updated via CMS as client confirms stock" },
    ],
    applications: "Residential backup, commercial power continuity and dealer supply",
    priceDisplay: "",
    imageUrl: "/images/cat-power-products.svg",
    datasheetUrl: "",
    isFeatured: false,
    isActive: true,
    sortOrder: 6,
  },
];

export const SEED_PROJECTS: Omit<ProjectItem, "id" | "createdAt">[] = [
  {
    slug: "rooftop-10kw-installation-sample",
    title: "10 kW Rooftop Solar Installation (Sample Slot)",
    projectType: "residential",
    capacityLabel: "10 kW Rooftop",
    location: "Mathura, Uttar Pradesh (Illustrative)",
    description:
      "Illustrative showcase slot reflecting GSM Solar Light's experience with multiple 10 kW rooftop solar installations. Replace with approved installation photos and verified site details in the CMS.",
    imageUrl: "/images/project-rooftop-placeholder.svg",
    isFeatured: true,
    isPlaceholder: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    slug: "commercial-rooftop-solar-sample",
    title: "Commercial Rooftop Solar System (Sample Slot)",
    projectType: "commercial",
    capacityLabel: "Commercial Rooftop",
    location: "Mathura Region (Illustrative)",
    description:
      "Placeholder entry for commercial building and institutional rooftop installations. Update with customer-approved photography and verified capacity via Admin CMS.",
    imageUrl: "/images/project-commercial-placeholder.svg",
    isFeatured: true,
    isPlaceholder: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    slug: "industrial-solar-capability-sample",
    title: "Industrial Solar Project Capability — Up to 1 MW (Sample Slot)",
    projectType: "industrial",
    capacityLabel: "Up to 1 MW Capability",
    location: "Uttar Pradesh (Illustrative)",
    description:
      "Represents GSM Solar Light's capability to undertake industrial and large-scale solar projects up to 1 MW. Upload verified industrial execution photographs once cleared for public display.",
    imageUrl: "/images/project-industrial-placeholder.svg",
    isFeatured: true,
    isPlaceholder: true,
    isActive: true,
    sortOrder: 3,
  },
];

