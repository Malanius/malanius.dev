import { getCollection } from 'astro:content';

const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export async function GET(context) {
  const site = (context.site ?? new URL('https://malanius.dev')).href.replace(/\/$/, '');
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${site}/blog/${post.id}/</link>
      <guid>${site}/blog/${post.id}/</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>malanius.dev</title>
    <link>${site}/</link>
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
