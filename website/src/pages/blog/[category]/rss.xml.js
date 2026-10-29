import { CATEGORIES } from '../../../data/blogCategories';
import { getPosts } from '../../../lib/blog';
import { rssResponse } from '../../../lib/rss';

export function getStaticPaths() {
  return CATEGORIES.map((category) => ({ params: { category } }));
}

export async function GET(context) {
  const { category } = context.params;
  return rssResponse(context.site, await getPosts(category), `malanius.dev · ${category}`);
}
