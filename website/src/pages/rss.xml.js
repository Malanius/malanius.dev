import { getPosts } from '../lib/blog';
import { rssResponse } from '../lib/rss';

export async function GET(context) {
  return rssResponse(context.site, await getPosts(), 'malanius.dev');
}
