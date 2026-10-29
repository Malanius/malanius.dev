export const STAGES = {
  seedling: { emoji: '🌱', label: 'seedling', hint: 'rough', color: 'var(--yellow)' },
  budding: { emoji: '🌿', label: 'budding', hint: 'growing', color: 'var(--green)' },
  evergreen: { emoji: '🌲', label: 'evergreen', hint: 'stable', color: 'var(--teal)' },
} as const;

export type Stage = keyof typeof STAGES;

export const STAGE_ORDER: Stage[] = ['seedling', 'budding', 'evergreen'];

/** Top-level areas listed in this order; anything new sorts alphabetically after. */
export const AREA_ORDER = ['tooling', 'media', 'meta'];

/** Note id without its directory path: "tooling/nix-flakes" → "nix-flakes" */
export const noteName = (id: string) => id.split('/').pop() ?? id;

interface NoteLike {
  id: string;
  data: { stage: Stage };
}

export interface GardenDir<T extends NoteLike> {
  name: string;
  path: string;
  dirs: GardenDir<T>[];
  notes: T[];
}

/**
 * Builds the sidebar tree from note ids: each directory segment becomes a
 * nested area, notes sort seedling → budding → evergreen within their area.
 */
export function buildGardenTree<T extends NoteLike>(notes: T[]): GardenDir<T> {
  interface MutableDir {
    name: string;
    path: string;
    dirs: Map<string, MutableDir>;
    notes: T[];
  }

  const root: MutableDir = { name: '', path: '', dirs: new Map(), notes: [] };

  for (const note of notes) {
    const parts = note.id.split('/');
    let node = root;
    for (const part of parts.slice(0, -1)) {
      let child = node.dirs.get(part);
      if (!child) {
        child = {
          name: part,
          path: node.path ? `${node.path}/${part}` : part,
          dirs: new Map(),
          notes: [],
        };
        node.dirs.set(part, child);
      }
      node = child;
    }
    node.notes.push(note);
  }

  const areaRank = (name: string) => {
    const i = AREA_ORDER.indexOf(name);
    return i === -1 ? AREA_ORDER.length : i;
  };

  const finalize = (node: MutableDir, depth: number): GardenDir<T> => ({
    name: node.name,
    path: node.path,
    dirs: [...node.dirs.values()]
      .sort((a, b) =>
        depth === 0 ? areaRank(a.name) - areaRank(b.name) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)
      )
      .map((d) => finalize(d, depth + 1)),
    notes: [...node.notes].sort(
      (a, b) =>
        STAGE_ORDER.indexOf(a.data.stage) - STAGE_ORDER.indexOf(b.data.stage) ||
        noteName(a.id).localeCompare(noteName(b.id))
    ),
  });

  return finalize(root, 0);
}
