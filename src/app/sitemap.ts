import { MetadataRoute } from "next";
import { servicesData } from "@/content/services";
import { projectsData } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.xpmindglobal.com";
  const currentDate = new Date();

  // Static root pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/training`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/s4hana-migration`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 9 Dynamic Service Pages
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 5 Dynamic Project Pages
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
