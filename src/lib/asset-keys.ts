/** R2 object keys — keep WP_UPLOAD_TO_ASSET_KEY in sync with scripts/r2-url-helpers.mjs */

export const WP_UPLOAD_TO_ASSET_KEY: Record<string, string> = {
  '2024/06/Spurana.com_.jpg': 'assets/site/spurana-portrait.jpg',
  '2024/06/holistic-healer-46.png': 'assets/site/logo.png',
  '2024/06/holistic-healer-21.png': 'assets/site/texture.png',
  '2024/06/holistic-healer-42.png': 'assets/site/program-gut-reset.png',
  '2024/06/holistic-healer-43.png': 'assets/site/program-weight.png',
  '2024/06/holistic-healer-45.png': 'assets/site/program-mental-wellness.png',
  '2024/06/holistic-healer-44.png': 'assets/site/program-herbal.png',
  '2024/06/holistic-healer-icon-9-4.png': 'assets/site/icon-hand.png',
  '2025/09/health-clinic-25.jpg': 'assets/site/banner-health.jpg',
}

export function siteAssetKey(filename: string): string {
  return `assets/site/${filename}`
}

export function articleAssetKey(slug: string, filename: string): string {
  return `assets/articles/${slug}/${filename}`
}

export function wpUploadRelToAssetKey(rel: string): string {
  if (WP_UPLOAD_TO_ASSET_KEY[rel]) return WP_UPLOAD_TO_ASSET_KEY[rel]
  const base = rel.split('/').pop() ?? rel
  return siteAssetKey(base)
}

export function resolveStorageKey(key: string): string {
  const normalized = key.startsWith('/') ? key.slice(1) : key
  if (normalized.startsWith('assets/')) return normalized

  const wpPrefix = 'wp-content/uploads/'
  if (normalized.startsWith(wpPrefix)) {
    return wpUploadRelToAssetKey(normalized.slice(wpPrefix.length))
  }

  return normalized
}
