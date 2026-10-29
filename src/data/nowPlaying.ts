export interface NowPlayingItem {
  emoji: string;
  title: string;
  progress: string;
  href?: string;
}

/** Hand-maintained entries; anime and manga come from MAL at build time (src/lib/mal.ts) */
export const nowPlaying: NowPlayingItem[] = [{ emoji: '🎮', title: 'Hades II', progress: '42h' }];
