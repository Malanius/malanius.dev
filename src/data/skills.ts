export interface Skill {
  name: string;
  icon: string;
  color: string;
  /** 1–5, see LEVELS */
  level: 1 | 2 | 3 | 4 | 5;
  note?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const LEVELS = [
  'read the tutorial',
  'enthusiastic amateur',
  'productive',
  'comfortable',
  'daily driver',
];

export const tech: SkillGroup[] = [
  {
    title: 'languages',
    skills: [
      { name: 'Rust', icon: 'fa-brands fa-rust', color: 'var(--peach)', level: 4, note: 'the borrow checker and I are friends now' },
      { name: 'TypeScript', icon: 'si-typescript', color: 'var(--blue)', level: 4 },
      { name: 'Go', icon: 'fa-brands fa-golang', color: 'var(--sapphire)', level: 3 },
      { name: 'Nix', icon: 'fa-solid fa-snowflake', color: 'var(--blue)', level: 3, note: 'six months in, see the blog' },
      { name: 'Zig', icon: 'fa-solid fa-bolt', color: 'var(--yellow)', level: 1, note: 'two weekends in' },
    ],
  },
  {
    title: 'tooling & infra',
    skills: [
      { name: 'Linux', icon: 'fa-brands fa-linux', color: 'var(--yellow)', level: 5 },
      { name: 'Neovim', icon: 'fa-solid fa-terminal', color: 'var(--green)', level: 5, note: 'the POWERED BY VIM badge is real' },
      { name: 'Docker', icon: 'fa-brands fa-docker', color: 'var(--blue)', level: 4 },
      { name: 'self-hosting', icon: 'fa-solid fa-server', color: 'var(--teal)', level: 4, note: "it's always DNS" },
      { name: 'CI/CD', icon: 'fa-solid fa-gears', color: 'var(--mauve)', level: 3 },
    ],
  },
  {
    title: 'web',
    skills: [
      { name: 'Astro', icon: 'fa-solid fa-rocket', color: 'var(--peach)', level: 4, note: 'this site' },
      { name: 'HTML/CSS', icon: 'fa-brands fa-css3-alt', color: 'var(--sapphire)', level: 4 },
      { name: 'Vue', icon: 'fa-brands fa-vuejs', color: 'var(--green)', level: 3, note: 'mango-reader frontend' },
    ],
  },
];

export const creative: SkillGroup[] = [
  {
    title: 'pixels',
    skills: [
      { name: 'ui theming', icon: 'fa-solid fa-brush', color: 'var(--mauve)', level: 5, note: 'catppuccin everything' },
      { name: '88×31 badges', icon: 'fa-solid fa-image', color: 'var(--yellow)', level: 4, note: 'load-bearing' },
      { name: 'pixel art', icon: 'fa-solid fa-palette', color: 'var(--pink)', level: 2, note: 'which explains a lot' },
    ],
  },
  {
    title: 'words & play',
    skills: [
      { name: 'technical writing', icon: 'fa-solid fa-pen-nib', color: 'var(--teal)', level: 3, note: 'blog + garden' },
      { name: 'game design', icon: 'fa-solid fa-gamepad', color: 'var(--red)', level: 2, note: 'pixel-shrine, wip' },
      { name: 'scope management', icon: 'fa-solid fa-triangle-exclamation', color: 'var(--peach)', level: 1, note: 'see: every project I own' },
    ],
  },
];
