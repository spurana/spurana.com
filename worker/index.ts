/// <reference types="@cloudflare/workers-types" />

import { resolveStorageKey } from '../src/lib/asset-keys'
import redirects from './redirects.json'

interface Env {
  STATIC_ASSETS: Fetcher
  /** R2 bucket: spurana-com-assets */
  ASSETS: R2Bucket
}

const imageTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
}

function normalizePath(pathname: string): string {
  if (pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

async function handleDownload(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const match = url.pathname.match(/^\/api\/download\/(.+)$/)
  if (!match) return new Response('Not Found', { status: 404 })

  const key = resolveStorageKey(decodeURIComponent(match[1]))
  const filename = url.searchParams.get('filename') || key.split('/').pop() || 'download'

  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 })

  const obj = await env.ASSETS.get(key)
  if (!obj) return new Response('File Not Found', { status: 404 })

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('etag', obj.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  return new Response(obj.body as ReadableStream, { headers })
}

async function handleFiles(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const match = url.pathname.match(/^\/api\/files\/(.+)$/)
  if (!match) return new Response('Not Found', { status: 404 })

  const key = resolveStorageKey(decodeURIComponent(match[1]))

  if (request.method === 'HEAD') {
    const obj = await env.ASSETS.head(key)
    if (!obj) return new Response('Not Found', { status: 404 })
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Length': obj.size.toString(),
        ETag: obj.httpEtag,
        'Last-Modified': obj.uploaded.toUTCString(),
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  }

  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 })

  const obj = await env.ASSETS.get(key)
  if (!obj) return new Response('Not Found', { status: 404 })

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('etag', obj.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  headers.set('X-Content-Type-Options', 'nosniff')
  if (key.endsWith('.zip')) {
    const filename = key.split('/').pop() || 'download.zip'
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
  }
  return new Response(obj.body as ReadableStream, { headers })
}

async function handleImages(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const match = url.pathname.match(/^\/api\/images\/(.+)$/)
  if (!match) return new Response('Not Found', { status: 404 })

  const key = resolveStorageKey(decodeURIComponent(match[1]))

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  if (request.method === 'HEAD') {
    const obj = await env.ASSETS.head(key)
    if (!obj) return new Response('Not Found', { status: 404 })
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Length': obj.size.toString(),
        ETag: obj.httpEtag,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const obj = await env.ASSETS.get(key)
  if (!obj) return new Response('Not Found', { status: 404 })

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('etag', obj.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  const ext = key.split('.').pop()?.toLowerCase()
  if (ext && imageTypes[ext]) headers.set('content-type', imageTypes[ext])
  return new Response(obj.body as ReadableStream, { headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = normalizePath(url.pathname)

    for (const rule of redirects) {
      const from = normalizePath(rule.from)
      if (path === from) {
        const target = new URL(rule.to, url.origin)
        return Response.redirect(target.toString(), 301)
      }
    }

    if (url.pathname.startsWith('/api/download/')) {
      return handleDownload(request, env)
    }
    if (url.pathname.startsWith('/api/files/')) {
      return handleFiles(request, env)
    }
    if (url.pathname.startsWith('/api/images/')) {
      return handleImages(request, env)
    }

    return env.STATIC_ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
