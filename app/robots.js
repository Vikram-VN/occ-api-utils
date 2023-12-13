export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://occ-api-utils.netlify.app/sitemap.xml",
  };
}
