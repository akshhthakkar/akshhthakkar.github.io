import { allProjects } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akshthakkar.me";

  const projects = allProjects
    .filter((project) => project.published)
    .map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.date ?? new Date()),
    }));

  const routes = ["", "/projects", "/certifications", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...projects];
}
