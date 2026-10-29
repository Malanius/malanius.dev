export const CATEGORIES = ['tech', 'maker', 'creative', 'musings'] as const;

export type Category = (typeof CATEGORIES)[number];
