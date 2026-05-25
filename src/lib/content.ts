import type { CollectionEntry } from 'astro:content'

export type ArticleEntry = CollectionEntry<'articles'>

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Wellness: 'sage',
  }
  return colors[category] || 'sage'
}
