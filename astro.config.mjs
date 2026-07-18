// @ts-check
import { defineConfig } from 'astro/config';
import { remarkWikilinks } from './src/lib/remark-wikilinks.mjs';

export default defineConfig({
  site: 'https://malanius.dev',
  markdown: {
    remarkPlugins: [remarkWikilinks],
    shikiConfig: {
      theme: 'catppuccin-mocha',
    },
  },
});
