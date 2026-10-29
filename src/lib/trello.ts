import { withCache } from './cache';
import type { NowPlayingItem } from './nowPlaying';

/** Public gaming board; read without an API key */
const BOARD = '95WkzKxV';

interface List {
  name: string;
  cards: { name: string; shortUrl: string }[];
}

/** Lists are matched by name, so the emoji prefixes on the board can change freely */
const LISTS = [
  { match: 'Playing', emoji: '🎮', progress: '' },
  { match: 'Infinite', emoji: '♾️', progress: '∞' },
];

async function fetchLists(): Promise<List[]> {
  const url = `https://api.trello.com/1/boards/${BOARD}/lists?cards=open&card_fields=name,shortUrl&fields=name`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** First 2 cards (board order) of the playing and infinite lists */
export async function trelloNowPlaying(): Promise<NowPlayingItem[]> {
  const lists = await withCache('trello', fetchLists, []);
  return LISTS.flatMap(({ match, emoji, progress }) =>
    (lists.find((l) => l.name.includes(match))?.cards ?? []).slice(0, 2).map((card) => ({
      emoji,
      title: card.name,
      progress,
      href: card.shortUrl,
    })),
  );
}
