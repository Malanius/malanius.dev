import { mkdir, readFile, writeFile } from 'node:fs/promises';

/**
 * Cache dir for data fetched at build time. node_modules/.cache is untracked but kept between
 * builds (most CI hosts cache node_modules).
 */
const DIR = new URL('../../node_modules/.cache/', import.meta.url);

/**
 * Runs fetcher and caches its result under name. When it fails, returns the last cached result
 * (stale beats empty), or fallback when nothing was cached yet.
 */
export async function withCache<T>(name: string, fetcher: () => Promise<T>, fallback: T): Promise<T> {
  const file = new URL(`${name}.json`, DIR);
  try {
    const data = await fetcher();
    await mkdir(DIR, { recursive: true });
    await writeFile(file, JSON.stringify(data));
    return data;
  } catch (err) {
    try {
      const cached = JSON.parse(await readFile(file, 'utf8'));
      console.warn(`[${name}] fetch failed, using cached data:`, err);
      return cached;
    } catch {
      console.warn(`[${name}] fetch failed and nothing cached, skipping:`, err);
      return fallback;
    }
  }
}
