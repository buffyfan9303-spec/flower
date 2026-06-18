import type { MetadataRoute } from "next";
import { getCatalog, getVisibleProducts } from "@/lib/catalog-store";

const base = "https://deudieo.flower";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [products, { events }] = await Promise.all([getVisibleProducts(), getCatalog()]);
  const staticRoutes = [
    "",
    "/shop",
    "/subscription",
    "/subscription/apply",
    "/about",
    "/journal",
    "/contact",
    "/order/corporate",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/shop/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${base}/event/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...eventRoutes];
}
