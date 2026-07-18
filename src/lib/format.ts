const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

/** "jul 12" — zero-padded day, for list rows */
export function monthDay(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}`;
}

/** "jul 12, 2026" */
export function fullDate(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** "mar 2026" */
export function monthYear(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function readingTime(body: string): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}
