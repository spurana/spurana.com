/** Public Worker URLs for R2 objects under assets/site and assets/articles. */

export function siteImage(filename: string): string {
  return `/api/images/assets/site/${filename}`
}

export function articleImage(slug: string, filename: string): string {
  return `/api/images/assets/articles/${slug}/${filename}`
}
