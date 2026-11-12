import Database from "better-sqlite3";
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
  ProductSpec,
  ProjectItem,
  ProjectType,
  RelationshipType,
  SiteSettings,
} from "./types";

declare global {
  var __gsmSqliteDb: Database.Database | undefined;
}

function resolveDbPath(): string {
  if (!process.env.VERCEL) {
    const localDir = path.join(process.cwd(), "data");
    try {
      fs.mkdirSync(localDir, { recursive: true });
      fs.accessSync(localDir, fs.constants.W_OK);
      return path.join(localDir, "gsm.db");
    } catch {
      // Fall back to OS temp directory if workspace filesystem is read-only
    }
  }

  const tmpDir = path.join(os.tmpdir(), "gsm-solar-data");
  fs.mkdirSync(tmpDir, { recursive: true });
  return path.join(tmpDir, "gsm.db");
}

function getDb(): Database.Database {
  if (globalThis.__gsmSqliteDb) {
    return globalThis.__gsmSqliteDb;
  }

  const dbPath = resolveDbPath();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  initSchema(db);
  seedIfEmpty(db);

  globalThis.__gsmSqliteDb = db;
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS product_categories (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      relationship_type TEXT NOT NULL,
      relationship_label TEXT NOT NULL,
      summary TEXT NOT NULL,
      description TEXT NOT NULL,
      logo_url TEXT NOT NULL DEFAULT '',
      catalogue_url TEXT NOT NULL DEFAULT '',
      note TEXT NOT NULL DEFAULT '',
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category_slug TEXT NOT NULL,
      brand_slug TEXT,
      short_description TEXT NOT NULL,
      detailed_description TEXT NOT NULL,
      specifications_json TEXT NOT NULL DEFAULT '[]',
      applications TEXT NOT NULL DEFAULT '',
      price_display TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      datasheet_url TEXT NOT NULL DEFAULT '',
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      project_type TEXT NOT NULL,
      capacity_label TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      image_url TEXT NOT NULL DEFAULT '',
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_placeholder INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT '',
      customer_type TEXT NOT NULL,
      requirement TEXT NOT NULL,
      project_capacity TEXT NOT NULL DEFAULT '',
      city TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      source_page TEXT NOT NULL DEFAULT '/',
      product_name TEXT NOT NULL DEFAULT '',
      consent_accepted INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

function seedIfEmpty(db: Database.Database) {
  const settingsCount = db
    .prepare("SELECT COUNT(*) as count FROM site_settings")
    .get() as { count: number };

  if (settingsCount.count === 0) {
    const insertSetting = db.prepare(
      "INSERT INTO site_settings (key, value) VALUES (?, ?)"
    );
    const tx = db.transaction((settings: SiteSettings) => {
      for (const [k, v] of Object.entries(settings)) {
        insertSetting.run(k, JSON.stringify(v));
      }
    });
    tx(DEFAULT_SITE_SETTINGS);
  }

  const catCount = db
    .prepare("SELECT COUNT(*) as count FROM product_categories")
    .get() as { count: number };
  if (catCount.count === 0) {
    const insertCat = db.prepare(
      "INSERT INTO product_categories (slug, name, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)"
    );
    const tx = db.transaction(() => {
      for (const c of SEED_CATEGORIES) {
        insertCat.run(c.slug, c.name, c.description, c.imageUrl, c.sortOrder);
      }
    });
    tx();
  }

  const brandCount = db
    .prepare("SELECT COUNT(*) as count FROM brands")
    .get() as { count: number };
  if (brandCount.count === 0) {
    const insertBrand = db.prepare(`
      INSERT INTO brands (
        slug, name, relationship_type, relationship_label, summary, description,
        logo_url, catalogue_url, note, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const tx = db.transaction(() => {
      for (const b of SEED_BRANDS) {
        insertBrand.run(
          b.slug,
          b.name,
          b.relationshipType,
          b.relationshipLabel,
          b.summary,
          b.description,
          b.logoUrl,
          b.catalogueUrl,
          b.note,
          b.isActive ? 1 : 0,
          b.sortOrder
        );
      }
    });
    tx();
  }

  const prodCount = db
    .prepare("SELECT COUNT(*) as count FROM products")
    .get() as { count: number };
  if (prodCount.count === 0) {
    const insertProd = db.prepare(`
      INSERT INTO products (
        slug, name, category_slug, brand_slug, short_description, detailed_description,
        specifications_json, applications, price_display, image_url, datasheet_url,
        is_featured, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const tx = db.transaction(() => {
      for (const p of SEED_PRODUCTS) {
        insertProd.run(
          p.slug,
          p.name,
          p.categorySlug,
          p.brandSlug,
          p.shortDescription,
          p.detailedDescription,
          JSON.stringify(p.specifications),
          p.applications,
          p.priceDisplay,
          p.imageUrl,
          p.datasheetUrl,
          p.isFeatured ? 1 : 0,
          p.isActive ? 1 : 0,
          p.sortOrder
        );
      }
    });
    tx();
  }

  const projCount = db
    .prepare("SELECT COUNT(*) as count FROM projects")
    .get() as { count: number };
  if (projCount.count === 0) {
    const insertProj = db.prepare(`
      INSERT INTO projects (
        slug, title, project_type, capacity_label, location, description,
        image_url, is_featured, is_placeholder, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const tx = db.transaction(() => {
      for (const pr of SEED_PROJECTS) {
        insertProj.run(
          pr.slug,
          pr.title,
          pr.projectType,
          pr.capacityLabel,
          pr.location,
          pr.description,
          pr.imageUrl,
          pr.isFeatured ? 1 : 0,
          pr.isPlaceholder ? 1 : 0,
          pr.isActive ? 1 : 0,
          pr.sortOrder
        );
      }
    });
    tx();
  }
}

export function getSiteSettings(): SiteSettings {
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM site_settings").all() as {
    key: string;
    value: string;
  }[];
  const merged: Record<string, unknown> = { ...DEFAULT_SITE_SETTINGS };
  for (const row of rows) {
    try {
      merged[row.key] = JSON.parse(row.value);
    } catch {
      merged[row.key] = row.value;
    }
  }
  return merged as unknown as SiteSettings;
}

export function updateSiteSettings(partial: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  const upsert = db.prepare(
    "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );
  const current = getSiteSettings();
  const next = { ...current, ...partial };
  const tx = db.transaction(() => {
    for (const [k, v] of Object.entries(next)) {
      upsert.run(k, JSON.stringify(v));
    }
  });
  tx();
  return next;
}

export function getCategories(): ProductCategory[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM product_categories ORDER BY sort_order ASC")
    .all() as {
    slug: string;
    name: string;
    description: string;
    image_url: string;
    sort_order: number;
  }[];
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    description: r.description,
    imageUrl: r.image_url,
    sortOrder: r.sort_order,
  }));
}

function mapProductRow(r: Record<string, unknown>): Product {
  let specs: ProductSpec[] = [];
  try {
    specs = JSON.parse(String(r.specifications_json || "[]"));
  } catch {
    specs = [];
  }
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    categorySlug: String(r.category_slug),
    brandSlug: r.brand_slug ? String(r.brand_slug) : null,
    shortDescription: String(r.short_description),
    detailedDescription: String(r.detailed_description),
    specifications: specs,
    applications: String(r.applications || ""),
    priceDisplay: String(r.price_display || ""),
    imageUrl: String(r.image_url || ""),
    datasheetUrl: String(r.datasheet_url || ""),
    isFeatured: Boolean(r.is_featured),
    isActive: Boolean(r.is_active),
    sortOrder: Number(r.sort_order),
    updatedAt: String(r.updated_at),
  };
}

export function getProducts(options?: {
  categorySlug?: string;
  brandSlug?: string;
  includeInactive?: boolean;
  featuredOnly?: boolean;
}): Product[] {
  const db = getDb();
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (!options?.includeInactive) {
    clauses.push("is_active = 1");
  }
  if (options?.categorySlug) {
    clauses.push("category_slug = ?");
    params.push(options.categorySlug);
  }
  if (options?.brandSlug) {
    clauses.push("brand_slug = ?");
    params.push(options.brandSlug);
  }
  if (options?.featuredOnly) {
    clauses.push("is_featured = 1");
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM products ${where} ORDER BY sort_order ASC, id ASC`)
    .all(...params) as Record<string, unknown>[];
  return rows.map(mapProductRow);
}

export function getProductBySlug(slug: string): Product | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;
  return row ? mapProductRow(row) : null;
}

export function upsertProduct(
  input: Omit<Product, "id" | "updatedAt"> & { id?: number }
): Product {
  const db = getDb();
  if (input.id) {
    db.prepare(`
      UPDATE products SET
        slug = ?, name = ?, category_slug = ?, brand_slug = ?,
        short_description = ?, detailed_description = ?, specifications_json = ?,
        applications = ?, price_display = ?, image_url = ?, datasheet_url = ?,
        is_featured = ?, is_active = ?, sort_order = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(
      input.slug,
      input.name,
      input.categorySlug,
      input.brandSlug || null,
      input.shortDescription,
      input.detailedDescription,
      JSON.stringify(input.specifications || []),
      input.applications,
      input.priceDisplay,
      input.imageUrl,
      input.datasheetUrl,
      input.isFeatured ? 1 : 0,
      input.isActive ? 1 : 0,
      input.sortOrder,
      input.id
    );
    const updated = db
      .prepare("SELECT * FROM products WHERE id = ?")
      .get(input.id) as Record<string, unknown>;
    return mapProductRow(updated);
  }

  const info = db
    .prepare(`
      INSERT INTO products (
        slug, name, category_slug, brand_slug, short_description, detailed_description,
        specifications_json, applications, price_display, image_url, datasheet_url,
        is_featured, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      input.slug,
      input.name,
      input.categorySlug,
      input.brandSlug || null,
      input.shortDescription,
      input.detailedDescription,
      JSON.stringify(input.specifications || []),
      input.applications,
      input.priceDisplay,
      input.imageUrl,
      input.datasheetUrl,
      input.isFeatured ? 1 : 0,
      input.isActive ? 1 : 0,
      input.sortOrder
    );
  const created = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(info.lastInsertRowid) as Record<string, unknown>;
  return mapProductRow(created);
}

export function deleteProduct(id: number): boolean {
  const db = getDb();
  const res = db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return res.changes > 0;
}

function mapBrandRow(r: Record<string, unknown>): BrandPartnership {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    name: String(r.name),
    relationshipType: String(r.relationship_type) as RelationshipType,
    relationshipLabel: String(r.relationship_label),
    summary: String(r.summary),
    description: String(r.description),
    logoUrl: String(r.logo_url || ""),
    catalogueUrl: String(r.catalogue_url || ""),
    note: String(r.note || ""),
    isActive: Boolean(r.is_active),
    sortOrder: Number(r.sort_order),
  };
}

export function getBrands(includeInactive = false): BrandPartnership[] {
  const db = getDb();
  const where = includeInactive ? "" : "WHERE is_active = 1";
  const rows = db
    .prepare(`SELECT * FROM brands ${where} ORDER BY sort_order ASC, id ASC`)
    .all() as Record<string, unknown>[];
  return rows.map(mapBrandRow);
}

export function updateBrand(
  id: number,
  input: Partial<Omit<BrandPartnership, "id">>
): BrandPartnership | null {
  const db = getDb();
  const existing = db
    .prepare("SELECT * FROM brands WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  if (!existing) return null;
  const current = mapBrandRow(existing);
  const next = { ...current, ...input };
  db.prepare(`
    UPDATE brands SET
      name = ?, relationship_type = ?, relationship_label = ?,
      summary = ?, description = ?, logo_url = ?, catalogue_url = ?,
      note = ?, is_active = ?, sort_order = ?
    WHERE id = ?
  `).run(
    next.name,
    next.relationshipType,
    next.relationshipLabel,
    next.summary,
    next.description,
    next.logoUrl,
    next.catalogueUrl,
    next.note,
    next.isActive ? 1 : 0,
    next.sortOrder,
    id
  );
  const updated = db
    .prepare("SELECT * FROM brands WHERE id = ?")
    .get(id) as Record<string, unknown>;
  return mapBrandRow(updated);
}

function mapProjectRow(r: Record<string, unknown>): ProjectItem {
  return {
    id: Number(r.id),
    slug: String(r.slug),
    title: String(r.title),
    projectType: String(r.project_type) as ProjectType,
    capacityLabel: String(r.capacity_label || ""),
    location: String(r.location || ""),
    description: String(r.description),
    imageUrl: String(r.image_url || ""),
    isFeatured: Boolean(r.is_featured),
    isPlaceholder: Boolean(r.is_placeholder),
    isActive: Boolean(r.is_active),
    sortOrder: Number(r.sort_order),
    createdAt: String(r.created_at),
  };
}

export function getProjects(options?: {
  projectType?: ProjectType;
  includeInactive?: boolean;
  featuredOnly?: boolean;
}): ProjectItem[] {
  const db = getDb();
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (!options?.includeInactive) {
    clauses.push("is_active = 1");
  }
  if (options?.projectType) {
    clauses.push("project_type = ?");
    params.push(options.projectType);
  }
  if (options?.featuredOnly) {
    clauses.push("is_featured = 1");
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM projects ${where} ORDER BY sort_order ASC, id DESC`)
    .all(...params) as Record<string, unknown>[];
  return rows.map(mapProjectRow);
}

export function upsertProject(
  input: Omit<ProjectItem, "id" | "createdAt"> & { id?: number }
): ProjectItem {
  const db = getDb();
  if (input.id) {
    db.prepare(`
      UPDATE projects SET
        slug = ?, title = ?, project_type = ?, capacity_label = ?, location = ?,
        description = ?, image_url = ?, is_featured = ?, is_placeholder = ?,
        is_active = ?, sort_order = ?
      WHERE id = ?
    `).run(
      input.slug,
      input.title,
      input.projectType,
      input.capacityLabel,
      input.location,
      input.description,
      input.imageUrl,
      input.isFeatured ? 1 : 0,
      input.isPlaceholder ? 1 : 0,
      input.isActive ? 1 : 0,
      input.sortOrder,
      input.id
    );
    const updated = db
      .prepare("SELECT * FROM projects WHERE id = ?")
      .get(input.id) as Record<string, unknown>;
    return mapProjectRow(updated);
  }

  const info = db
    .prepare(`
      INSERT INTO projects (
        slug, title, project_type, capacity_label, location,
        description, image_url, is_featured, is_placeholder, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      input.slug,
      input.title,
      input.projectType,
      input.capacityLabel,
      input.location,
      input.description,
      input.imageUrl,
      input.isFeatured ? 1 : 0,
      input.isPlaceholder ? 1 : 0,
      input.isActive ? 1 : 0,
      input.sortOrder
    );
  const created = db
    .prepare("SELECT * FROM projects WHERE id = ?")
    .get(info.lastInsertRowid) as Record<string, unknown>;
  return mapProjectRow(created);
}

export function deleteProject(id: number): boolean {
  const db = getDb();
  const res = db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  return res.changes > 0;
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
  const db = getDb();
  const info = db
    .prepare(`
      INSERT INTO enquiries (
        name, mobile, email, customer_type, requirement, project_capacity,
        city, message, source_page, product_name, consent_accepted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      input.name,
      input.mobile,
      input.email || "",
      input.customerType,
      input.requirement,
      input.projectCapacity || "",
      input.city || "",
      input.message || "",
      input.sourcePage || "/",
      input.productName || "",
      input.consentAccepted ? 1 : 0
    );
  const row = db
    .prepare("SELECT * FROM enquiries WHERE id = ?")
    .get(info.lastInsertRowid) as Record<string, unknown>;
  return mapEnquiryRow(row);
}

function mapEnquiryRow(r: Record<string, unknown>): Enquiry {
  return {
    id: Number(r.id),
    name: String(r.name),
    mobile: String(r.mobile),
    email: String(r.email || ""),
    customerType: String(r.customer_type) as CustomerType,
    requirement: String(r.requirement) as EnquiryRequirement,
    projectCapacity: String(r.project_capacity || ""),
    city: String(r.city || ""),
    message: String(r.message || ""),
    sourcePage: String(r.source_page || "/"),
    productName: String(r.product_name || ""),
    consentAccepted: Boolean(r.consent_accepted),
    status: String(r.status || "new") as Enquiry["status"],
    createdAt: String(r.created_at),
  };
}

export function getEnquiries(): Enquiry[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM enquiries ORDER BY id DESC")
    .all() as Record<string, unknown>[];
  return rows.map(mapEnquiryRow);
}

export function updateEnquiryStatus(
  id: number,
  status: Enquiry["status"]
): boolean {
  const db = getDb();
  const res = db
    .prepare("UPDATE enquiries SET status = ? WHERE id = ?")
    .run(status, id);
  return res.changes > 0;
}

