# malanius.dev

Personal site: projects, skills, blog. Static [Astro 5](https://docs.astro.build) site, Catppuccin
colors, JetBrains Mono everywhere.

- [Quick start](#quick-start)
- [Repo map](#repo-map)
- [Writing blog posts](#writing-blog-posts)
- [Projects, skills, socials](#projects-skills-socials)
- [Icons](#icons)
- [Home page and now playing](#home-page-and-now-playing)
- [Styling and theme](#styling-and-theme)
- [The garden (hidden)](#the-garden-hidden)
- [Deploying](#deploying)
- [Working with jj](#working-with-jj)
- [Troubleshooting](#troubleshooting)
- [Astro in five minutes](#astro-in-five-minutes)

## Quick start

```sh
npm install
npm run dev       # dev server on http://localhost:4321, reloads on save
npm run build     # static site into dist/
npm run preview   # serve dist/ to check the real build
```

Create a `.env` file (gitignored) for the MAL integration:

```sh
MAL_CLIENT_ID=your-client-id
```

The site builds without it; anime and manga then come from the cache or are skipped (see
[now playing](#now-playing)).

## Repo map

```
public/                  copied to the site as-is (favicon.svg)
src/
  content/blog/          blog posts (Markdown)
  content/garden/        garden notes (hidden for now)
  content.config.ts      frontmatter schemas for blog and garden
  data/                  hand-edited site data
    projects.ts            projects page
    skills.ts              skills page
    socials.ts             footer icons
    blogCategories.ts      blog categories
    brandIcons.ts          extra brand icons (Simple Icons)
  lib/                   build-time helpers
    blog.ts                post queries, feed paths
    rss.ts                 RSS XML
    nowPlaying.ts          now playing = Trello games + MAL anime/manga
    mal.ts, trello.ts      the two data sources
    cache.ts               stale-data fallback for both
    format.ts              date formats, reading time
  pages/                 one file = one URL (see below)
  components/            reusable pieces (Header, Footer, ProjectRow, …)
  layouts/BaseLayout.astro   <head>, header, footer around every page
  styles/global.css      colors, shared classes, post typography
```

Pages and their URLs:

| File                                  | URL                                   |
| ------------------------------------- | ------------------------------------- |
| `pages/index.astro`                   | `/`                                   |
| `pages/projects.astro`                | `/projects/`                          |
| `pages/skills.astro`                  | `/skills/`                            |
| `pages/blog/index.astro`              | `/blog/`                              |
| `pages/blog/[category]/index.astro`   | `/blog/tech/`, `/blog/maker/`, …      |
| `pages/blog/[...slug].astro`          | `/blog/<post>/`                       |
| `pages/rss.xml.js`                    | `/rss.xml` (all posts)                |
| `pages/blog/[category]/rss.xml.js`    | `/blog/<category>/rss.xml`            |
| `pages/404.astro`                     | shown for any missing URL             |
| `pages/_garden/`                      | nothing: `_` prefix hides it          |

## Writing blog posts

### A new post

Create `src/content/blog/<slug>.md`. The file name becomes the URL: `my-first-post.md` →
`/blog/my-first-post/`.

```md
---
title: 'My first post'
date: 2026-11-02
category: tech
tags: [astro, aws]
---

Text starts here. Normal Markdown.
```

| Field      | Required | Notes                                                        |
| ---------- | -------- | ------------------------------------------------------------ |
| `title`    | yes      | Quote it if it contains `:`                                  |
| `date`     | yes      | `YYYY-MM-DD`. Posts sort newest first by this.               |
| `category` | yes      | One of `tech`, `maker`, `creative`, `musings`                |
| `tags`     | no       | Shown on the post. Free-form, no tag pages.                  |

A typo in the frontmatter (missing title, unknown category) fails the build with a message
pointing at the file. That's the schema in `src/content.config.ts` doing its job.

Reading time is calculated from the text (200 words/min). The post automatically appears on
`/blog/`, its category page, the home page "recent writing" card (latest 3) and both RSS feeds.

### Images

Put images next to the post and use a relative path. Astro then optimizes them at build time
(converts to WebP, adds width/height, lazy loading).

Two layouts work; pick per post:

```
# flat: post file + folder of the same name for its images
src/content/blog/terminal-setup.md
src/content/blog/terminal-setup/stack.png
  → ![my terminal stack](./terminal-setup/stack.png)

# folder: everything in one folder, URL stays /blog/terminal-setup/
src/content/blog/terminal-setup/index.md
src/content/blog/terminal-setup/stack.png
  → ![my terminal stack](./stack.png)
```

Always write alt text (the part in `[]`). Images in `public/` also work (`![x](/img.png)`) but
skip optimization, so prefer the relative way.

A worked example lives in history: `jj show xlnkvkyx` (git: `4e7a3c7`, "docs: example post
image").

### What Markdown supports here

Headings, lists, links, `inline code`, blockquotes, tables (scroll sideways on phones), and
fenced code blocks with syntax highlighting in Catppuccin colors (they follow the light/dark
theme). Put the language after the fence: ` ```ts `, ` ```sh `, ` ```rust `.

### Drafts

There's no draft flag: every file in `src/content/blog/` gets published. Keep unfinished posts
on their own jj change (see [draft posts](#draft-posts)) or outside the folder until ready.

### Categories

Defined once in `src/data/blogCategories.ts`:

```ts
export const CATEGORIES = ['tech', 'maker', 'creative', 'musings'] as const;
```

Adding one there creates its page (`/blog/<name>/`), its feed and its link in the category nav.
Removing one fails the build for any post still using it.

## Projects, skills, socials

All three are TypeScript arrays in `src/data/`. Edit, save, the dev server reloads.

### Projects (`src/data/projects.ts`)

Four exported lists, one per section on the page: `code`, `contributions`, `maker`, `creative`.
Order in the file = order on the page.

```ts
{
  name: 'pidjezdy',
  status: 'active',               // active | wip | planned | done | archived (optional)
  description: 'One or two sentences.',
  tech: [tech.rust, tech.linux],  // icons from the `tech` map at the top of the file
  links: [github('pidjezdy')],    // optional; github() builds the GitHub link
},
```

New technology? Add it to the `tech` map once, then reuse it:

```ts
const tech = {
  zig: { icon: 'fa-solid fa-bolt', color: 'var(--peach)', label: 'Zig' },
  …
};
```

Non-GitHub links take an icon, URL and label: `{ icon: 'fa-brands fa-mixcloud', href: '…',
label: 'Mixcloud' }`. The tooltip defaults to "<name> on <label>"; set `title` to override.

### Skills (`src/data/skills.ts`)

Two exported lists, `tech` and `creative`, each made of titled groups:

```ts
{ name: 'Rust', icon: 'fa-brands fa-rust', color: 'var(--peach)', level: 2, note: 'pidjezdy, bingorat' },
```

`level` is 1–5 and maps to the labels in `LEVELS` (read the tutorial → daily driver), shown as
the legend at the bottom of the page. `note` is optional small print under the name.

### Socials (`src/data/socials.ts`)

Footer icons, in display order. Each is `{ label, href, icon, color }`.

## Icons

Anywhere an `icon` is expected you can use either:

1. **Font Awesome 6.5.2** classes, e.g. `fa-brands fa-github`, `fa-solid fa-terminal`. Search
   the free set at <https://fontawesome.com/v6/search?ic=free>. Loaded from cdnjs in
   `BaseLayout.astro`.
2. **A `brandIcons` key**, e.g. `si-typescript`, for brands Font Awesome lacks.

To add a brand icon:

1. Find it on <https://simpleicons.org> (CC0 licensed).
2. Download the SVG, copy the `d="…"` value of its `<path>`.
3. Add it to `src/data/brandIcons.ts` as `'si-<name>': '<path>'`.
4. Use `'si-<name>'` as the icon.

Colors are always CSS variables from the palette: `var(--peach)`, `var(--blue)`, … (list in
[styling](#styling-and-theme)).

## Home page and now playing

### Intro and interests

Both live directly in `src/pages/index.astro`: the bio is the `<p class="bio">` paragraph, the
interests are the `interests` array in the frontmatter (keep it sorted).

### Now playing

Filled automatically at **build time**, so it's as fresh as the last build:

| Rows        | Source                                                                 | You control it by                    |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------ |
| 🎮 2 games  | Trello board [95WkzKxV](https://trello.com/b/95WkzKxV), list "Playing" | Card order: top 2 cards show         |
| 📺 2 anime  | MAL list, status "watching"                                            | Updating episodes on MAL             |
| 📖 2 manga  | MAL list, status "reading"                                             | Updating chapters/volumes on MAL     |

- MAL sorts by last update, so whatever you touched most recently shows first. Episodes show as
  `ep 04/13`; manga shows volume if you track it, otherwise chapter.
- Trello needs no key (public board). The list is found by the word "Playing" in its name, so
  emojis can change but keep the word.
- Each successful fetch is saved to `node_modules/.cache/<source>.json`. If MAL or Trello is down
  (or `MAL_CLIENT_ID` is missing), the build uses that saved copy and prints a `[mal]` or
  `[trello]` warning. Stale rows beat an empty panel.
- To change counts, emojis or formats: `src/lib/mal.ts`, `src/lib/trello.ts`.

MAL Client ID: MAL → Account Settings → API → Create ID (app type "web", placeholder URLs are
fine).

## Styling and theme

### Colors

Catppuccin, defined as CSS variables in `src/styles/global.css` for both flavors: **mocha**
(dark) and **latte** (light). Always use the variables, never hex values, so both themes work:

```
text:    --text --subtext1 --subtext0 --overlay0
surface: --crust --mantle --base --surface0 --surface1
accent:  --mauve --blue --lavender --sapphire --teal --green --yellow --peach --red --pink
```

### Theme toggle

First visit follows the OS setting. The 「月」/「日」 button in the header switches flavors and
remembers the choice in `localStorage`. The small inline script in `BaseLayout.astro` applies it
before the page paints, so there's no flash.

### Shared classes

In `global.css`: `.panel` / `.panel-title` (the boxed cards), `.page-pad`, `.page-title`,
`.page-subtitle`, `.jp` (the 「」 kanji labels), `.muted`, and `.prose` for post typography.

### Layout notes

- The content column is 860px wide, centered; posts keep a narrower 680px for readability.
- Grids use `minmax(0, 1fr)`, not `1fr`: plain `1fr` lets long text widen a column and push
  things off-screen.
- Checked down to 320px wide. Below 720px card grids go single-column; below 640px paddings
  shrink.

## The garden (hidden)

The digital garden (linked notes with 🌱/🌿/🌲 stages and `[[wikilinks]]`) is built but hidden for
the first deploy. Its pages are in `src/pages/_garden/`; Astro ignores anything starting with `_`.

Its notes in `src/content/garden/` are still placeholders. To bring it back:

1. Replace the placeholder notes with real ones (schema: `title`, `stage`, `tags`, `planted`,
   `tended`).
2. Rename `src/pages/_garden/` → `src/pages/garden/`.
3. Add `{ id: 'garden', label: 'garden', href: '/garden/' }` to `items` in
   `src/components/Header.astro`.

Heads-up: the `[[note-slug]]` syntax is active in all Markdown, blog posts included, and links to
`/garden/…`. Don't use it in posts while the garden is hidden.

## Deploying

Any static host works (Cloudflare Pages, Netlify, Vercel, GitHub Pages):

| Setting       | Value                                         |
| ------------- | --------------------------------------------- |
| Build command | `npm run build`                               |
| Output dir    | `dist`                                        |
| Node          | 20.3+ or 22+ (developed on 24)                |
| Env vars      | `MAL_CLIENT_ID`                               |

`404.html` is picked up automatically by all of the above. The site URL (`https://malanius.dev`,
used in RSS links) is set in `astro.config.mjs`.

**Keeping now playing fresh**: data only updates on build. For a daily refresh, create a deploy
hook on the host (a secret URL that triggers a build) and call it on a schedule, e.g. a GitHub
Actions workflow:

```yaml
on:
  schedule: [{ cron: '0 5 * * *' }]
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST "${{ secrets.DEPLOY_HOOK_URL }}"
```

## Working with jj

The repo is jj (Jujutsu) colocated with git, so both work, but use jj for changes.

```sh
jj st                          # what changed
jj diff                        # the changes themselves
jj commit -m "feat: …"         # finish current change, start a new empty one
jj commit <paths> -m "…"       # commit only some files, rest stays in working copy
jj squash                      # fold working copy into the previous commit (fix-up)
jj log                         # history
jj show <change-id>            # one commit
jj restore <path>              # discard changes to a file
jj file untrack <path>         # stop tracking (add to .gitignore first)
```

jj snapshots every file automatically, so anything not in `.gitignore` ends up tracked. Generated
stuff (`dist/`, `.astro/`, `node_modules/`, `.env`, `.playwright-mcp/`) is already ignored.

### Bookmarks and pushing

There's no bookmark (jj's branch) or remote yet. Before the first push:

```sh
jj bookmark create main -r @-              # point main at the last commit
jj git remote add origin <repo-url>        # e.g. git@github.com:malanius/<repo>.git
jj git push --bookmark main --allow-new
```

After that, each time you want to publish new commits:

```sh
jj bookmark set main -r @-                 # move main forward to the latest commit
jj git push
```

### Draft posts

Write a draft as a side change off `main`, so it never ends up in what you push:

```sh
jj new main -m "draft: post about X"       # work here; jj saves as you go
jj new main                                # back to normal work, draft stays aside
jj edit <draft-change-id>                  # return to the draft later
jj rebase -r <draft-change-id> -d main     # when done, put it on top of main and push
```

Commit messages follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`.

## Troubleshooting

**Deleted post still shows up / new post doesn't.** Astro caches content in
`node_modules/.astro/data-store.json`. It goes stale in edge cases, notably when the blog folder
becomes completely empty, or when a post moves between flat and folder layout (a one-time
"Duplicate id" warning). Fix:

```sh
rm node_modules/.astro/data-store.json && npm run build
```

For the dev server, stop it, delete the file, start again.

**"The collection "blog" does not exist or is empty" warnings.** Harmless while there are no
posts; they go away with the first one.

**`[mal] fetch failed` / `[trello] fetch failed`.** The API was unreachable or `MAL_CLIENT_ID`
isn't set; the build used cached data (or skipped the rows). Check `.env` or the host's env vars.

**Favicon doesn't update.** Browsers cache favicons hard; hard-reload or open in a private window.

**Editor shows red errors but the build passes.** Usually a stale TypeScript server; reload the
editor window. `npx astro sync` regenerates Astro's types.

## Astro in five minutes

An `.astro` file has two parts:

```astro
---
// frontmatter: JavaScript that runs at BUILD time, never in the browser
import BaseLayout from '../layouts/BaseLayout.astro';
const posts = await getPosts();
---

<!-- template: HTML with {expressions}, like JSX -->
<BaseLayout title="…">
  {posts.map((p) => <a href={`/blog/${p.id}/`}>{p.data.title}</a>)}
</BaseLayout>

<style>
  /* scoped: only applies to this file's elements */
  a { color: var(--blue); }
</style>
```

- **Static output.** Everything runs once during `npm run build`; the result is plain HTML/CSS.
  That's why now playing needs a rebuild to update, and why the `fetch()` calls in `src/lib/` are
  fine (they run on your machine or the build host, not in visitors' browsers).
- **Scoped styles.** `<style>` in a component only affects that component. Use `:global(…)` to
  escape, or put shared styles in `global.css`.
- **Browser JavaScript** needs a `<script>` tag (see the theme toggle in `Header.astro` or the
  path display in `404.astro`).
- **Content collections** (`src/content.config.ts`) turn a folder of Markdown into typed data
  with validated frontmatter. Query with `getCollection('blog')`; each entry has `id` (from the
  file name), `data` (frontmatter) and a renderable body.
- **Dynamic routes.** `[category]` and `[...slug]` in file names are placeholders;
  `getStaticPaths()` in those files lists every value to generate a page for.
- **`public/`** is copied verbatim; `src/` is processed (bundled, optimized).
- `import.meta.env.X` reads env vars (from `.env` locally, from the host when deployed).

Docs: <https://docs.astro.build>
