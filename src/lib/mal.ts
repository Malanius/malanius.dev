import { mkdir, readFile, writeFile } from 'node:fs/promises';
import type { NowPlayingItem } from '../data/nowPlaying';

const USER = 'malanius';
const API = 'https://api.myanimelist.net/v2';

/**
 * Last successful fetch, used when MAL is unreachable. Lives in node_modules/.cache so it is
 * untracked but kept between builds (most CI hosts cache node_modules).
 */
const CACHE = new URL('../../node_modules/.cache/mal.json', import.meta.url);

interface Entry {
  node: {
    id: number;
    title: string;
    alternative_titles?: { en?: string };
    num_episodes?: number;
  };
  list_status: {
    num_episodes_watched?: number;
    num_volumes_read?: number;
    num_chapters_read?: number;
  };
}

/** Most recently updated entries of a public MAL list. Fetched once per build. */
async function fetchList(kind: 'anime' | 'manga', limit: number): Promise<Entry[]> {
  const clientId = import.meta.env.MAL_CLIENT_ID;
  if (!clientId) throw new Error('MAL_CLIENT_ID not set');

  const status = kind === 'anime' ? 'watching' : 'reading';
  const fields = kind === 'anime' ? 'alternative_titles,list_status,num_episodes' : 'alternative_titles,list_status';
  const url = `${API}/users/${USER}/${kind}list?status=${status}&sort=list_updated_at&limit=${limit}&fields=${fields}`;

  const res = await fetch(url, { headers: { 'X-MAL-CLIENT-ID': clientId } });
  if (!res.ok) throw new Error(`${kind} list: HTTP ${res.status}`);
  return (await res.json()).data;
}

/** Fresh lists when MAL answers, otherwise the cached ones (or nothing on a first build) */
async function fetchLists(): Promise<{ anime: Entry[]; manga: Entry[] }> {
  try {
    const [anime, manga] = await Promise.all([fetchList('anime', 2), fetchList('manga', 2)]);
    await mkdir(new URL('.', CACHE), { recursive: true });
    await writeFile(CACHE, JSON.stringify({ anime, manga }));
    return { anime, manga };
  } catch (err) {
    try {
      const cached = JSON.parse(await readFile(CACHE, 'utf8'));
      console.warn('[mal] fetch failed, using cached lists:', err);
      return cached;
    } catch {
      console.warn('[mal] fetch failed and nothing cached, skipping:', err);
      return { anime: [], manga: [] };
    }
  }
}

const title = (e: Entry) => e.node.alternative_titles?.en || e.node.title;

/** ep 04/13; just ep 573 when the total is unknown (still airing) */
function episodes(e: Entry) {
  const watched = e.list_status.num_episodes_watched ?? 0;
  const total = e.node.num_episodes ?? 0;
  if (!total) return `ep ${watched}`;
  return `ep ${String(watched).padStart(String(total).length, '0')}/${total}`;
}

/** Current volume if tracked, otherwise chapter */
function volumes(e: Entry) {
  const { num_volumes_read: vol = 0, num_chapters_read: ch = 0 } = e.list_status;
  return vol ? `vol ${vol}` : `ch ${ch}`;
}

export async function malNowPlaying(): Promise<NowPlayingItem[]> {
  const { anime, manga } = await fetchLists();
  return [
    ...anime.map((e) => ({
      emoji: '📺',
      title: title(e),
      progress: episodes(e),
      href: `https://myanimelist.net/anime/${e.node.id}`,
    })),
    ...manga.map((e) => ({
      emoji: '📖',
      title: title(e),
      progress: volumes(e),
      href: `https://myanimelist.net/manga/${e.node.id}`,
    })),
  ];
}
