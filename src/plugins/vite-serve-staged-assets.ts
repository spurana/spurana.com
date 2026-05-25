/**
 * Dev/preview: serve downloads/ at /api/images and /api/files (mirrors Worker + R2 in production).
 */
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import { resolveStorageKey } from '../lib/asset-keys'

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

function attachAssetMiddleware(server: ViteDevServer, downloads: string) {
  server.middlewares.use((req, res, next) => {
    const url = req.url?.split('?')[0] ?? ''
    const match = url.match(/^\/api\/(?:images|files|download)\/(.+)$/)
    if (!match) return next()

    const key = resolveStorageKey(decodeURIComponent(match[1]))
    const filePath = path.join(downloads, key)
    if (!filePath.startsWith(downloads) || !fs.existsSync(filePath)) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    const ext = path.extname(filePath).slice(1).toLowerCase()
    res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    if (url.startsWith('/api/download/')) {
      const name = path.basename(filePath)
      res.setHeader('Content-Disposition', `attachment; filename="${name}"`)
    }
    fs.createReadStream(filePath).pipe(res)
  })
}

export function viteServeStagedAssets(): Plugin {
  const downloads = path.resolve('downloads')

  return {
    name: 'vite-serve-staged-assets',
    apply: 'serve',
    configureServer(server) {
      attachAssetMiddleware(server, downloads)
    },
    configurePreviewServer(server) {
      attachAssetMiddleware(server, downloads)
    },
  }
}
