export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (url.startsWith('/')) {
    // Prepend Strapi address
    return `${process.env.STRAPI_URL}${url}`
  }
  // Otherwise return full URL
  return url
}
