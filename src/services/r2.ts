/// <reference types="@cloudflare/workers-types" />

import {
  articleAssetKey,
  resolveStorageKey,
  siteAssetKey,
  wpUploadRelToAssetKey,
} from '../lib/asset-keys'

export interface R2Env {
  ASSETS: R2Bucket
}

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'])

export class R2Service {
  private static instance: R2Service
  readonly bucketName = 'spurana-com-assets'

  static getInstance(): R2Service {
    if (!R2Service.instance) {
      R2Service.instance = new R2Service()
    }
    return R2Service.instance
  }

  parseR2Url(url: string): { bucket: string; key: string } | null {
    if (url.startsWith('r2://')) {
      const path = url.slice(5)
      const [bucket, ...keyParts] = path.split('/')
      return { bucket, key: keyParts.join('/') }
    }
    if (url.includes('.r2.cloudflarestorage.com/')) {
      const key = url.split('.r2.cloudflarestorage.com/')[1]?.split('?')[0]
      if (!key) return null
      return { bucket: this.bucketName, key }
    }
    return null
  }

  getR2KeyFromPath(path: string): string {
    return path.startsWith('/') ? path.slice(1) : path
  }

  resolveStorageKey(key: string): string {
    return resolveStorageKey(decodeURIComponent(this.getR2KeyFromPath(key)))
  }

  isImageKey(key: string): boolean {
    const ext = key.split('.').pop()?.toLowerCase()
    return ext ? IMAGE_EXTENSIONS.has(ext) : false
  }

  getProxyUrl(key: string, type: 'file' | 'download' | 'image' = 'file', filename?: string): string {
    const normalizedKey = this.getR2KeyFromPath(key)
    if (type === 'download') {
      const qs = filename ? `?filename=${encodeURIComponent(filename)}` : ''
      return `/api/download/${normalizedKey}${qs}`
    }
    if (type === 'image' || this.isImageKey(normalizedKey)) {
      return `/api/images/${normalizedKey}`
    }
    return `/api/files/${normalizedKey}`
  }

  rewriteWpUrl(wpUrl: string): string {
    const match = wpUrl.match(/\/wp-content\/uploads\/(.+)$/i)
    if (!match) return wpUrl
    return this.getProxyUrl(wpUploadRelToAssetKey(match[1]))
  }

  rewriteAssetUrl(url: string): string {
    if (!url || url.startsWith('/api/')) return url

    const parsed = this.parseR2Url(url)
    if (parsed) {
      return this.getProxyUrl(parsed.key)
    }

    if (url.includes('/wp-content/uploads/')) {
      return this.rewriteWpUrl(url)
    }

    if (url.match(/^\/?assets\/articles\/([^/]+)\/(.+)$/)) {
      const m = url.match(/^\/?assets\/articles\/([^/]+)\/(.+)$/)!
      return this.getProxyUrl(articleAssetKey(m[1], m[2]))
    }

    if (url.match(/^\/?assets\/site\/(.+)$/)) {
      const m = url.match(/^\/?assets\/site\/(.+)$/)!
      return this.getProxyUrl(siteAssetKey(m[1]))
    }

    if (url.startsWith('https://spurana.com/') || url.startsWith('http://spurana.com/')) {
      try {
        const pathname = new URL(url).pathname
        if (pathname.includes('/wp-content/uploads/')) {
          return this.rewriteWpUrl(pathname)
        }
      } catch {
        /* ignore invalid URLs */
      }
    }

    return url
  }

  rewriteContent(content: string): string {
    let out = content

    out = out.replace(
      /(!?\[[^\]]*\]\()([^\s)]+)(\))/g,
      (_match, prefix: string, url: string, suffix: string) => `${prefix}${this.rewriteAssetUrl(url)}${suffix}`,
    )

    out = out.replace(
      /(\s(?:src|href)=["'])([^"']+)(["'])/gi,
      (_match, prefix: string, url: string, suffix: string) => `${prefix}${this.rewriteAssetUrl(url)}${suffix}`,
    )

    out = out.replace(/r2:\/\/[^\s"'<>]+/g, (url) => this.rewriteAssetUrl(url))
    out = out.replace(/https?:\/\/spurana\.com\/wp-content\/uploads\/[^\s"'<>]+/gi, (url) =>
      this.rewriteAssetUrl(url),
    )

    return out
  }

  async getFile(
    key: string,
    env: R2Env,
  ): Promise<{ body: ReadableStream; headers: Headers } | null> {
    const storageKey = this.resolveStorageKey(key)
    const obj = await env.ASSETS.get(storageKey)
    if (!obj) return null

    const headers = new Headers()
    obj.writeHttpMetadata(headers)
    headers.set('etag', obj.httpEtag)
    headers.set('cache-control', 'public, max-age=31536000, immutable')
    headers.set('X-Content-Type-Options', 'nosniff')

    return { body: obj.body as ReadableStream, headers }
  }
}

export default R2Service
