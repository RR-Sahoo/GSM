import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  DEFAULT_SITE_SETTINGS,
  SEED_BRANDS,
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  SEED_PROJECTS,
} from "./seed";
import type {
  BrandPartnership,
  CustomerType,
  Enquiry,
  EnquiryRequirement,
  Product,
  ProductCategory,
  ProjectItem,
  ProjectType,
  SiteSettings,
} from "./types";

interface StoreData {
  settings: SiteSettings;
  categories: ProductCategory[];
  brands: BrandPartnership[];
  products: Product[];
  projects: ProjectItem[];
  enquiries: Enquiry[];
  counters: {
    brandId: number;
    productId: number;
    projectId: number;
    enquiryId: number;
  };
}

declare global {
  var __gsmStoreCache: { path: string; data: StoreData } | undefined;
}

function resolveStorePath(): string {
  if (!process.env.VERCEL) {
    const localDir = path.join(process.cwd(), "data");
    try {
      fs.mkdirSync(localDir, { recursive: true });
      fs.accessSync(localDir, fs.constants.W_OK);
      return path.join(localDir, "gsm-store.json");
    } catch {
      // Fall back to OS temp directory when filesystem is read-only
    }
  }

  const tmpDir = path.join(os.tmpdir(), "gsm-solar-data");
  fs.mkdirSync(tmpDir, { recursive: true });
  return path.join(tmpDir, "gsm-store.json");
}

function createInitialStore(): StoreData {
  const now = new Date().toISOString();
  const brands: BrandPartnership[] = SEED_BRANDS.map((b, i) => ({
    ...b,
    id: i + 1,
  }));
  const products: Product[] = SEED_PRODUCTS.map((p, i) => ({
    ...p,
    id: i + 1,
    updatedAt: now,
  }));
  const projects: ProjectItem[] = SEED_PROJECTS.map((pr, i) => ({
    ...pr,
    id: i + 1,
    createdAt: now,
  }));

  return {
    settings: { ...DEFAULT_SITE_SETTINGS },
    categories: [...SEED_CATEGORIES],
    brands,
    products,
    projects,
    enquiries: [],
    counters: {
      brandId: brands.length,
      productId: products.length,
      projectId: projects.length,
      enquiryId: 0,
    },
  };
}

function readStore(): StoreData {
  const storePath = resolveStorePath();
  if (
    globalThis.__gsmStoreCache &&
    globalThis.__gsmStoreCache.path === storePath
  ) {
    return globalThis.__gsmStoreCache.data;
  }

  let data: StoreData;
  if (fs.existsSync(storePath)) {
    try {
      const raw = fs.readFileSync(storePath, "utf8");
      const parsed = JSON.parse(raw) as Partial<StoreData>;
      const fallback = createInitialStore();
      data = {
        settings: { ...DEFAULT_SITE_SETTINGS, ...(parsed.settings || {}) },
        categories: parsed.categories?.length
          ? parsed.categories
          : fallback.categories,
        brands: parsed.brands?.length ? parsed.brands : fallback.brands,
        products: parsed.products ?? fallback.products,
        projects: parsed.projects ?? fallback.projects,
        enquiries: parsed.enquiries ?? [],
        counters: parsed.counters ?? fallback.counters,
      };
    } catch {
      data = createInitialStore();
      writeStoreFile(storePath, data);
    }
  } else {
    data = createInitialStore();
    writeStoreFile(storePath, data);
  }

  globalThis.__gsmStoreCache = { path: storePath, data };
  return data;
}

function writeStoreFile(storePath: string, data: StoreData) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
}

function saveStore(data: StoreData) {
  const storePath = resolveStorePath();
  globalThis.__gsmStoreCache = { path: storePath, data };
  writeStoreFile(storePath, data);
}

export function getSiteSettings(): SiteSettings {
  return { ...readStore().settings };
}

export function updateSiteSettings(partial: Partial<SiteSettings>): SiteSettings {
  const store = readStore();
  store.settings = { ...store.settings, ...partial };
  saveStore(store);
  return { ...store.settings };
}

export function getCategories(): ProductCategory[] {
  return [...readStore().categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProducts(options?: {
  categorySlug?: string;
  brandSlug?: string;
  includeInactive?: boolean;
  featuredOnly?: boolean;
}): Product[] {
  return readStore()
    .products.filter((p) => {
      if (!options?.includeInactive && !p.isActive) return false;
      if (options?.categorySlug && p.categorySlug !== options.categorySlug)
        return false;
      if (options?.brandSlug && p.brandSlug !== options.brandSlug) return false;
      if (options?.featuredOnly && !p.isFeatured) return false;
      return true;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

export function getProductBySlug(slug: string): Product | null {
  return readStore().products.find((p) => p.slug === slug) || null;
}

export function upsertProduct(
  input: Omit<Product, "id" | "updatedAt"> & { id?: number }
): Product {
  const store = readStore();
  const now = new Date().toISOString();

  if (input.id) {
    const idx = store.products.findIndex((p) => p.id === input.id);
    if (idx >= 0) {
      const updated: Product = {
        ...input,
        id: input.id,
        updatedAt: now,
      };
      store.products[idx] = updated;
      saveStore(store);
      return updated;
    }
  }

  store.counters.productId += 1;
  const created: Product = {
    ...input,
    id: store.counters.productId,
    updatedAt: now,
  };
  store.products.push(created);
  saveStore(store);
  return created;
}

export function deleteProduct(id: number): boolean {
  const store = readStore();
  const prevLen = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  if (store.products.length !== prevLen) {
    saveStore(store);
    return true;
  }
  return false;
}

export function getBrands(includeInactive = false): BrandPartnership[] {
  return readStore()
    .brands.filter((b) => includeInactive || b.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

export function updateBrand(
  id: number,
  input: Partial<Omit<BrandPartnership, "id">>
): BrandPartnership | null {
  const store = readStore();
  const idx = store.brands.findIndex((b) => b.id === id);
  if (idx < 0) return null;

  const updated: BrandPartnership = {
    ...store.brands[idx],
    ...input,
    id,
  };
  store.brands[idx] = updated;
  saveStore(store);
  return updated;
}

export function getProjects(options?: {
  projectType?: ProjectType;
  includeInactive?: boolean;
  featuredOnly?: boolean;
}): ProjectItem[] {
  return readStore()
    .projects.filter((pr) => {
      if (!options?.includeInactive && !pr.isActive) return false;
      if (options?.projectType && pr.projectType !== options.projectType)
        return false;
      if (options?.featuredOnly && !pr.isFeatured) return false;
      return true;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || b.id - a.id);
}

export function upsertProject(
  input: Omit<ProjectItem, "id" | "createdAt"> & { id?: number }
): ProjectItem {
  const store = readStore();
  const now = new Date().toISOString();

  if (input.id) {
    const idx = store.projects.findIndex((pr) => pr.id === input.id);
    if (idx >= 0) {
      const updated: ProjectItem = {
        ...input,
        id: input.id,
        createdAt: store.projects[idx].createdAt,
      };
      store.projects[idx] = updated;
      saveStore(store);
      return updated;
    }
  }

  store.counters.projectId += 1;
  const created: ProjectItem = {
    ...input,
    id: store.counters.projectId,
    createdAt: now,
  };
  store.projects.push(created);
  saveStore(store);
  return created;
}

export function deleteProject(id: number): boolean {
  const store = readStore();
  const prevLen = store.projects.length;
  store.projects = store.projects.filter((pr) => pr.id !== id);
  if (store.projects.length !== prevLen) {
    saveStore(store);
    return true;
  }
  return false;
}

export function createEnquiry(input: {
  name: string;
  mobile: string;
  email?: string;
  customerType: CustomerType;
  requirement: EnquiryRequirement;
  projectCapacity?: string;
  city?: string;
  message?: string;
  sourcePage?: string;
  productName?: string;
  consentAccepted: boolean;
}): Enquiry {
  const store = readStore();
  store.counters.enquiryId += 1;
  const created: Enquiry = {
    id: store.counters.enquiryId,
    name: input.name,
    mobile: input.mobile,
    email: input.email || "",
    customerType: input.customerType,
    requirement: input.requirement,
    projectCapacity: input.projectCapacity || "",
    city: input.city || "",
    message: input.message || "",
    sourcePage: input.sourcePage || "/",
    productName: input.productName || "",
    consentAccepted: input.consentAccepted,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(created);
  saveStore(store);
  return created;
}

export function getEnquiries(): Enquiry[] {
  return [...readStore().enquiries];
}

export function updateEnquiryStatus(
  id: number,
  status: Enquiry["status"]
): boolean {
  const store = readStore();
  const idx = store.enquiries.findIndex((e) => e.id === id);
  if (idx < 0) return false;
  store.enquiries[idx].status = status;
  saveStore(store);
  return true;
}
