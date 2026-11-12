export type RelationshipType = "current_distributor" | "previous_partnership";

export type ProjectType = "residential" | "commercial" | "industrial";

export type CustomerType =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Dealer"
  | "Business / Project Partner"
  | "Other";

export type EnquiryRequirement =
  | "Solar Installation"
  | "Solar Product"
  | "Lithium-Ion Battery"
  | "E-rickshaw Charger"
  | "Mtek Power"
  | "Getsun Power"
  | "Other";

export interface SiteSettings {
  companyName: string;
  tagline: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapsUrl: string;
  heroOfferFreeConsultation: boolean;
  showGroundMountedSolar: boolean;
  showExecutionProcess: boolean;
  showProductPrices: boolean;
  gaMeasurementId: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  categorySlug: string;
  brandSlug: string | null;
  shortDescription: string;
  detailedDescription: string;
  specifications: ProductSpec[];
  applications: string;
  priceDisplay: string;
  imageUrl: string;
  datasheetUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  updatedAt: string;
}

export interface BrandPartnership {
  id: number;
  slug: string;
  name: string;
  relationshipType: RelationshipType;
  relationshipLabel: string;
  summary: string;
  description: string;
  logoUrl: string;
  catalogueUrl: string;
  note: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ProjectItem {
  id: number;
  slug: string;
  title: string;
  projectType: ProjectType;
  capacityLabel: string;
  location: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  isPlaceholder: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Enquiry {
  id: number;
  name: string;
  mobile: string;
  email: string;
  customerType: CustomerType;
  requirement: EnquiryRequirement;
  projectCapacity: string;
  city: string;
  message: string;
  sourcePage: string;
  productName: string;
  consentAccepted: boolean;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

