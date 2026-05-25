import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z
      .union([z.string(), z.date()])
      .optional()
      .transform((v) => (v instanceof Date ? v.toISOString().split('T')[0] : v)),
    category: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z
      .union([z.boolean(), z.string()])
      .optional()
      .default(false)
      .transform((v) => v === true || v === 'true'),
    legacyPath: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
})

export const collections = { articles, pages }
