import fs from 'node:fs';
import path from 'node:path';

const GARDEN_DIR = path.resolve('src/content/garden');
const LINK_RE = /(\[\[[a-z0-9-]+\]\])/g;

/** Maps note slug → full garden id, e.g. "nix-flakes" → "tooling/nix-flakes" */
function collectSlugs(dir, prefix, map) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      collectSlugs(path.join(dir, entry.name), `${prefix}${entry.name}/`, map);
    } else if (entry.name.endsWith('.md')) {
      const slug = entry.name.replace(/\.md$/, '');
      map.set(slug, `${prefix}${slug}`);
    }
  }
}

/**
 * Turns [[note-slug]] into a garden link, or a "not planted yet" stub
 * when no note with that slug exists.
 */
export function remarkWikilinks() {
  return (tree) => {
    const slugs = new Map();
    collectSlugs(GARDEN_DIR, '', slugs);

    const visit = (node) => {
      if (!node.children) return;
      const next = [];
      for (const child of node.children) {
        if (child.type === 'text' && child.value.includes('[[')) {
          for (const part of child.value.split(LINK_RE)) {
            const match = part.match(/^\[\[([a-z0-9-]+)\]\]$/);
            if (match) {
              const slug = match[1];
              next.push({
                type: 'html',
                value: slugs.has(slug)
                  ? `<a class="wikilink" href="/garden/${slugs.get(slug)}/">${slug}</a>`
                  : `<span class="wikilink wikilink-missing" title="not planted yet">${slug}</span>`,
              });
            } else if (part) {
              next.push({ type: 'text', value: part });
            }
          }
        } else {
          visit(child);
          next.push(child);
        }
      }
      node.children = next;
    };

    visit(tree);
  };
}
