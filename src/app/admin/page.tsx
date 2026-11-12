import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getBrands,
  getCategories,
  getEnquiries,
  getProducts,
  getProjects,
  getSiteSettings,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff CMS",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return <AdminLoginForm />;
  }

  return (
    <AdminDashboard
      initialSettings={getSiteSettings()}
      categories={getCategories()}
      initialProducts={getProducts({ includeInactive: true })}
      initialBrands={getBrands(true)}
      initialProjects={getProjects({ includeInactive: true })}
      initialEnquiries={getEnquiries()}
    />
  );
}

