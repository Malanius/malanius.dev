import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from '../data/blogCategories';

export type Post = CollectionEntry<'blog'>;

/** Newest first, optionally limited to one category */
export async function getPosts(category?: Category): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => !category || post.data.category === category);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "/rss.xml" for everything, "/blog/<category>/rss.xml" for one category */
export function feedPath(category?: Category): string {
  return category ? `/blog/${category}/rss.xml` : '/rss.xml';
}
