import { malNowPlaying } from './mal';
import { trelloNowPlaying } from './trello';

export interface NowPlayingItem {
  emoji: string;
  title: string;
  progress: string;
  href?: string;
}

/** Games from Trello, then anime and manga from MAL; all fetched at build time */
export async function nowPlaying(): Promise<NowPlayingItem[]> {
  const [games, mal] = await Promise.all([trelloNowPlaying(), malNowPlaying()]);
  return [...games, ...mal];
}
