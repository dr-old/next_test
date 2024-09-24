// utils/seo.ts
export function seoTitle(
  title: string,
  category: string = "",
  siteName: string = "YourSiteName"
): string {
  const baseTitle = siteName || "YourSiteName";

  if (category) {
    // Format title with category and site name
    return `${title} - ${category} | ${baseTitle}`;
  }

  // Fallback title without category
  return `${title} | ${baseTitle}`;
}

// utils/seo.ts
export function createSeoUrl(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim() // Remove extra spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}
