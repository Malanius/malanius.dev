import { withCache } from './cache';
import type { NowPlayingItem } from './nowPlaying';

/** Public gaming board; read without an API key */
const BOARD = '95WkzKxV';

interface List {
  name: string;
  cards: { name: string; shortUrl: string }[];
}

async function fetchLists(): Promise<List[]> {
  const url = `https://api.trello.com/1/boards/${BOARD}/lists?cards=open&card_fields=name,shortUrl&fields=name`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * First 2 cards (board order) of the playing list. Matched by name, so the emoji prefix on the
 * board can change freely.
 */
export async function trelloNowPlaying(): Promise<NowPlayingItem[]> {
  const lists = await withCache('trello', fetchLists, []);
  const playing = lists.find((l) => l.name.includes('Playing'))?.cards ?? [];
  return playing.slice(0, 2).map((card) => ({
    emoji: '🎮',
    title: card.name,
    progress: '',
    href: card.shortUrl,
  }));
}
