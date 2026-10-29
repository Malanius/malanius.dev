import type { NowPlayingItem } from '../data/nowPlaying';

const USER = 'malanius';
const API = 'https://api.myanimelist.net/v2';

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
  if (!clientId) {
    console.warn('[mal] MAL_CLIENT_ID not set, skipping', kind);
    return [];
  }

  const status = kind === 'anime' ? 'watching' : 'reading';
  const fields = kind === 'anime' ? 'alternative_titles,list_status,num_episodes' : 'alternative_titles,list_status';
  const url = `${API}/users/${USER}/${kind}list?status=${status}&sort=list_updated_at&limit=${limit}&fields=${fields}`;

  try {
    const res = await fetch(url, { headers: { 'X-MAL-CLIENT-ID': clientId } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()).data;
  } catch (err) {
    console.warn(`[mal] fetching ${kind} list failed, skipping:`, err);
    return [];
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
  const [anime, manga] = await Promise.all([fetchList('anime', 2), fetchList('manga', 2)]);
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
