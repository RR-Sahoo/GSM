"use client";

import {
  Building2,
  ExternalLink,
  FolderKanban,
  Inbox,
  LogOut,
  Package,
  Plus,
  Save,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  BrandPartnership,
  Enquiry,
  Product,
  ProductCategory,
  ProductSpec,
  ProjectItem,
  ProjectType,
  SiteSettings,
} from "@/lib/types";

interface AdminDashboardProps {
  initialSettings: SiteSettings;
  categories: ProductCategory[];
  initialProducts: Product[];
  initialBrands: BrandPartnership[];
  initialProjects: ProjectItem[];
  initialEnquiries: Enquiry[];
}

type TabKey = "enquiries" | "products" | "brands" | "projects" | "settings";

export function AdminDashboard({
  initialSettings,
  categories,
  initialProducts,
  initialBrands,
  initialProjects,
  initialEnquiries,
}: AdminDashboardProps) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("enquiries");
  const [statusBanner, setStatusBanner] = useState("");

  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [brands, setBrands] = useState<BrandPartnership[]>(initialBrands);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);

  // Product editor state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(
    null
  );
  // Project editor state
  const [editingProject, setEditingProject] =
    useState<Partial<ProjectItem> | null>(null);

  function notify(msg: string) {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(""), 4000);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function uploadAsset(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) {
      notify(data.error || "Upload failed");
      return null;
    }
    return data.url as string;
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      notify("Site settings & feature flags saved.");
    } else {
      notify("Failed to save settings.");
    }
  }

  async function updateEnquiry(id: number, status: Enquiry["status"]) {
    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setEnquiries((prev) =>
        prev.map((enq) => (enq.id === id ? { ...enq, status } : enq))
      );
      notify(`Enquiry #${id} marked ${status}.`);
    }
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    });
    const data = await res.json();
    if (res.ok && data.product) {
      setProducts((prev) => {
        const exists = prev.some((p) => p.id === data.product.id);
        return exists
          ? prev.map((p) => (p.id === data.product.id ? data.product : p))
          : [...prev, data.product];
      });
      setEditingProduct(null);
      notify("Product saved.");
    } else {
      notify(data.error || "Error saving product");
    }
  }

  async function removeProduct(id: number) {
    const res = await fetch(`/api/admin/products?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      notify("Product deleted.");
    }
  }

  async function saveBrand(brand: BrandPartnership) {
    const res = await fetch("/api/admin/brands", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    if (res.ok) {
      notify(`Updated ${brand.name}.`);
    } else {
      notify(`Failed to update ${brand.name}.`);
    }
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject) return;
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProject),
    });
    const data = await res.json();
    if (res.ok && data.project) {
      setProjects((prev) => {
        const exists = prev.some((p) => p.id === data.project.id);
        return exists
          ? prev.map((p) => (p.id === data.project.id ? data.project : p))
          : [data.project, ...prev];
      });
      setEditingProject(null);
      notify("Project saved.");
    } else {
      notify(data.error || "Error saving project");
    }
  }

  async function removeProject(id: number) {
    const res = await fetch(`/api/admin/projects?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      notify("Project deleted.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Top Bar */}
      <header className="bg-[#0B1F3A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">
              GSM Solar Light — Staff CMS Dashboard
            </h1>
            <p className="text-xs text-slate-300">
              Manage enquiries, product catalogue, brand partnerships, projects
              and site settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-600 text-xs font-semibold hover:border-emerald-400"
            >
              View Live Site
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {statusBanner && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-900">
            {statusBanner}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {[
            {
              key: "enquiries",
              label: `Enquiries (${enquiries.length})`,
              icon: Inbox,
            },
            {
              key: "products",
              label: `Products (${products.length})`,
              icon: Package,
            },
            {
              key: "brands",
              label: `Brands (${brands.length})`,
              icon: Building2,
            },
            {
              key: "projects",
              label: `Projects (${projects.length})`,
              icon: FolderKanban,
            },
            {
              key: "settings",
              label: "Settings & Confirmations",
              icon: Settings,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key as TabKey)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  tab === item.key
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENQUIRIES */}
        {tab === "enquiries" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Customer &amp; Dealer Enquiries
            </h2>
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">
                No enquiries submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#0B1F3A]">
                          {enq.name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                          {enq.customerType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                          {enq.requirement}
                        </span>
                        {enq.productName && (
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
                            Product: {enq.productName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">
                        Mobile: <strong>{enq.mobile}</strong>
                        {enq.email ? ` • Email: ${enq.email}` : ""}
                        {enq.city ? ` • City: ${enq.city}` : ""}
                        {enq.projectCapacity
                          ? ` • Capacity: ${enq.projectCapacity}`
                          : ""}
                      </p>
                      {enq.message && (
                        <p className="text-sm text-slate-700 pt-1">
                          {enq.message}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400">
                        Source: {enq.sourcePage} • {enq.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          updateEnquiry(
                            enq.id,
                            e.target.value as Enquiry["status"]
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {tab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Manage Products &amp; Categories
              </h2>
              <button
                type="button"
                onClick={() =>
                  setEditingProduct({
                    name: "",
                    slug: "",
                    categorySlug: categories[0]?.slug || "solar-panels",
                    brandSlug: null,
                    shortDescription: "",
                    detailedDescription: "",
                    specifications: [{ label: "Model", value: "" }],
                    applications: "",
                    priceDisplay: "",
                    imageUrl: "/images/cat-solar-panels.svg",
                    datasheetUrl: "",
                    isFeatured: false,
                    isActive: true,
                    sortOrder: products.length + 1,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {editingProduct && (
              <form
                onSubmit={saveProduct}
                className="bg-white rounded-2xl border-2 border-emerald-200 p-6 space-y-4"
              >
                <h3 className="font-bold text-[#0B1F3A]">
                  {editingProduct.id ? "Edit Product" : "New Product"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Category
                    </label>
                    <select
                      value={editingProduct.categorySlug || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          categorySlug: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Distribution Brand (Optional)
                    </label>
                    <select
                      value={editingProduct.brandSlug || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          brandSlug: e.target.value || null,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">None / General GSM Supply</option>
                      {brands
                        .filter(
                          (b) => b.relationshipType === "current_distributor"
                        )
                        .map((b) => (
                          <option key={b.slug} value={b.slug}>
                            {b.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Price Display (shown only if Public Pricing enabled)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.priceDisplay || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          priceDisplay: e.target.value,
                        })
                      }
                      placeholder="Leave blank for Request Price / Enquire"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        shortDescription: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.detailedDescription || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        detailedDescription: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                {/* Specifications editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Specifications (Client-Confirmed Only)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProduct({
                          ...editingProduct,
                          specifications: [
                            ...(editingProduct.specifications || []),
                            { label: "", value: "" },
                          ],
                        })
                      }
                      className="text-xs font-semibold text-emerald-700"
                    >
                      + Add Spec Row
                    </button>
                  </div>
                  {(editingProduct.specifications || []).map(
                    (spec: ProductSpec, idx: number) => (
                      <div key={idx} className="grid grid-cols-5 gap-2">
                        <input
                          type="text"
                          placeholder="Label (e.g., Capacity)"
                          value={spec.label}
                          onChange={(e) => {
                            const copy = [
                              ...(editingProduct.specifications || []),
                            ];
                            copy[idx] = { ...copy[idx], label: e.target.value };
                            setEditingProduct({
                              ...editingProduct,
                              specifications: copy,
                            });
                          }}
                          className="col-span-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={spec.value}
                          onChange={(e) => {
                            const copy = [
                              ...(editingProduct.specifications || []),
                            ];
                            copy[idx] = { ...copy[idx], value: e.target.value };
                            setEditingProduct({
                              ...editingProduct,
                              specifications: copy,
                            });
                          }}
                          className="col-span-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = (
                              editingProduct.specifications || []
                            ).filter((_, i) => i !== idx);
                            setEditingProduct({
                              ...editingProduct,
                              specifications: copy,
                            });
                          }}
                          className="text-xs text-red-600 font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Product Image URL or Upload
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingProduct.imageUrl || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            imageUrl: e.target.value,
                          })
                        }
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await uploadAsset(file);
                            if (url) {
                              setEditingProduct({
                                ...editingProduct,
                                imageUrl: url,
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Datasheet / Catalogue PDF URL or Upload
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingProduct.datasheetUrl || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            datasheetUrl: e.target.value,
                          })
                        }
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        PDF
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await uploadAsset(file);
                            if (url) {
                              setEditingProduct({
                                ...editingProduct,
                                datasheetUrl: url,
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={editingProduct.isActive !== false}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isActive: e.target.checked,
                        })
                      }
                    />
                    Active on Website
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProduct.isFeatured)}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isFeatured: e.target.checked,
                        })
                      }
                    />
                    Featured
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase text-emerald-700">
                      {p.categorySlug} {!p.isActive ? "• HIDDEN" : ""}
                    </span>
                    <h3 className="font-bold text-[#0B1F3A] mt-0.5">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {p.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(p)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold hover:border-emerald-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProduct(p.id)}
                      aria-label={`Delete ${p.name}`}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BRANDS */}
        {tab === "brands" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Manage Brands &amp; Distribution Partnerships
            </h2>
            <div className="space-y-5">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#0B1F3A]">
                      {brand.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        brand.relationshipType === "current_distributor"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {brand.relationshipLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Relationship Status
                      </label>
                      <select
                        value={brand.relationshipType}
                        onChange={(e) => {
                          const relType = e.target
                            .value as BrandPartnership["relationshipType"];
                          setBrands((prev) =>
                            prev.map((b) =>
                              b.id === brand.id
                                ? {
                                    ...b,
                                    relationshipType: relType,
                                    relationshipLabel:
                                      relType === "current_distributor"
                                        ? "Distributor"
                                        : "Previous Distribution Partnership",
                                  }
                                : b
                            )
                          );
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="current_distributor">
                          Current Distributor
                        </option>
                        <option value="previous_partnership">
                          Previous Distribution Partnership
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Logo URL or Upload Approved Logo
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={brand.logoUrl}
                          onChange={(e) =>
                            setBrands((prev) =>
                              prev.map((b) =>
                                b.id === brand.id
                                  ? { ...b, logoUrl: e.target.value }
                                  : b
                              )
                            )
                          }
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs"
                        />
                        <label className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 text-xs font-semibold cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          Logo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const url = await uploadAsset(file);
                              if (url) {
                                setBrands((prev) =>
                                  prev.map((b) =>
                                    b.id === brand.id
                                      ? { ...b, logoUrl: url }
                                      : b
                                  )
                                );
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Summary
                    </label>
                    <textarea
                      rows={2}
                      value={brand.summary}
                      onChange={(e) =>
                        setBrands((prev) =>
                          prev.map((b) =>
                            b.id === brand.id
                              ? { ...b, summary: e.target.value }
                              : b
                          )
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      value={brand.description}
                      onChange={(e) =>
                        setBrands((prev) =>
                          prev.map((b) =>
                            b.id === brand.id
                              ? { ...b, description: e.target.value }
                              : b
                          )
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => saveBrand(brand)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save {brand.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {tab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Manage Our Projects Gallery
              </h2>
              <button
                type="button"
                onClick={() =>
                  setEditingProject({
                    title: "",
                    slug: "",
                    projectType: "residential",
                    capacityLabel: "",
                    location: "Mathura, Uttar Pradesh",
                    description: "",
                    imageUrl: "/images/project-rooftop-placeholder.svg",
                    isFeatured: true,
                    isPlaceholder: false,
                    isActive: true,
                    sortOrder: 0,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {editingProject && (
              <form
                onSubmit={saveProject}
                className="bg-white rounded-2xl border-2 border-emerald-200 p-6 space-y-4"
              >
                <h3 className="font-bold text-[#0B1F3A]">
                  {editingProject.id ? "Edit Project" : "New Project"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Project Type
                    </label>
                    <select
                      value={editingProject.projectType || "residential"}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          projectType: e.target.value as ProjectType,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Confirmed Capacity Label
                    </label>
                    <input
                      type="text"
                      value={editingProject.capacityLabel || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          capacityLabel: e.target.value,
                        })
                      }
                      placeholder="e.g., 10 kW Rooftop"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      City / Location (if approved)
                    </label>
                    <input
                      type="text"
                      value={editingProject.location || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          location: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Project Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.description || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        description: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Project Photo URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingProject.imageUrl || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          imageUrl: e.target.value,
                        })
                      }
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                    <label className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 text-xs font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadAsset(file);
                          if (url) {
                            setEditingProject({
                              ...editingProject,
                              imageUrl: url,
                              isPlaceholder: false,
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={editingProject.isActive !== false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          isActive: e.target.checked,
                        })
                      }
                    />
                    Active
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.isFeatured)}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          isFeatured: e.target.checked,
                        })
                      }
                    />
                    Featured on Homepage
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.isPlaceholder)}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          isPlaceholder: e.target.checked,
                        })
                      }
                    />
                    Mark as Sample Slot (Placeholder)
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((pr) => (
                <div
                  key={pr.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase text-emerald-700">
                      {pr.projectType}{" "}
                      {pr.isPlaceholder ? "• SAMPLE PLACEHOLDER" : ""}
                    </span>
                    <h3 className="font-bold text-[#0B1F3A] mt-0.5">
                      {pr.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {pr.capacityLabel} • {pr.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingProject(pr)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProject(pr.id)}
                      aria-label={`Delete ${pr.title}`}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS & CONFIRMATION TOGGLES */}
        {tab === "settings" && (
          <form
            onSubmit={saveSettings}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
          >
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Company Contact Details &amp; Brief Confirmation Toggles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Confirmed Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Confirmed WhatsApp Number (digits with country code, e.g. 9198...)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsapp: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Official Enquiry Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Google Maps Link (Confirmed Location)
                </label>
                <input
                  type="url"
                  value={settings.mapsUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, mapsUrl: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Complete Business Address (Mathura, Uttar Pradesh)
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Google Analytics 4 Measurement ID (Optional, e.g. G-XXXXXXXXXX)
              </label>
              <input
                type="text"
                value={settings.gaMeasurementId}
                onChange={(e) =>
                  setSettings({ ...settings, gaMeasurementId: e.target.value })
                }
                className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <p className="text-sm font-bold text-[#0B1F3A]">
                Client Confirmation Feature Flags (Brief Sections 4.2, 5.2 &amp; 5.3)
              </p>

              <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showGroundMountedSolar}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      showGroundMountedSolar: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <span>
                  <strong>Enable Ground-Mounted Solar</strong> on Solar
                  Solutions page (enable only after GSM Solar Light confirms
                  this service is offered)
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showExecutionProcess}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      showExecutionProcess: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <span>
                  <strong>Enable Project Installation &amp; Execution</strong>{" "}
                  process section (enable only after GSM confirms exact workflow)
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.heroOfferFreeConsultation}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      heroOfferFreeConsultation: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <span>
                  Use <strong>&ldquo;Get a Free Consultation&rdquo;</strong>{" "}
                  wording instead of &ldquo;Get a Consultation&rdquo; (only
                  enable if GSM offers free consultations)
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showProductPrices}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      showProductPrices: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <span>
                  <strong>Publish Product Prices publicly</strong> (keep
                  unchecked for Request Price / Enquire mode)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

