// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { viteServeStagedAssets } from './src/plugins/vite-serve-staged-assets.ts'

export default defineConfig({
  site: 'https://spurana.com',
  integrations: [sitemap(), tailwind()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  vite: {
    plugins: [viteServeStagedAssets()],
    server: {
      port: 4321,
      host: 'localhost',
    },
  },
})
