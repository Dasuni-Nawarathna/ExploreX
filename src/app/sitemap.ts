import { MetadataRoute } from "next";
import { destinationsData } from "@/data/destinations";
import { packagesData } from "@/data/packages";
import { hotelsData } from "@/data/hotels";
import { blogsData } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://explorex.lk";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/destinations",
    "/packages",
    "/hotels",
    "/builder",
    "/map",
    "/vehicles",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/terms",
    "/privacy"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinationsData.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9
  }));

  const packageRoutes: MetadataRoute.Sitemap = packagesData.map((p) => ({
    url: `${baseUrl}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95
  }));

  const hotelRoutes: MetadataRoute.Sitemap = hotelsData.map((h) => ({
    url: `${baseUrl}/hotels/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogsData.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...packageRoutes,
    ...hotelRoutes,
    ...blogRoutes
  ];
}

