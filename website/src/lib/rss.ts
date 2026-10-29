import type { Post } from './blog';

const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function rssResponse(site: URL | undefined, posts: Post[], title: string): Response {
  const base = (site ?? new URL('https://malanius.dev')).href.replace(/\/$/, '');

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${base}/blog/${post.id}/</link>
      <guid>${base}/blog/${post.id}/</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <category>${post.data.category}</category>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(title)}</title>
    <link>${base}/</link>
    <description>Developer, anime enjoyer, and collector of half-finished side projects.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
