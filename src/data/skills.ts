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
      { name: 'TypeScript', icon: 'si-typescript', color: 'var(--blue)', level: 5 },
      { name: 'Shell', icon: 'fa-solid fa-terminal', color: 'var(--green)', level: 5 },
      { name: 'Python', icon: 'fa-brands fa-python', color: 'var(--yellow)', level: 4 },
      { name: 'Rust', icon: 'fa-brands fa-rust', color: 'var(--peach)', level: 2, note: 'pidjezdy, bingorat' },
    ],
  },
  {
    title: 'past lives & side quests',
    skills: [
      { name: 'Java', icon: 'fa-brands fa-java', color: 'var(--red)', level: 3 },
      { name: 'COBOL', icon: 'fa-solid fa-server', color: 'var(--teal)', level: 3, note: 'AS400, back in the day' },
      { name: 'Go', icon: 'fa-brands fa-golang', color: 'var(--sapphire)', level: 2 },
      { name: 'ReasonML', icon: 'si-reason', color: 'var(--pink)', level: 2 },
    ],
  },
  {
    title: 'cloud',
    skills: [
      { name: 'AWS', icon: 'fa-brands fa-aws', color: 'var(--peach)', level: 5, note: 'Solutions Architect Associate, renewed 3×' },
      { name: 'AWS CDK', icon: 'fa-solid fa-cubes', color: 'var(--mauve)', level: 5 },
      { name: 'serverless & event-driven', icon: 'fa-solid fa-bolt', color: 'var(--yellow)', level: 5 },
      { name: 'Terraform', icon: 'si-terraform', color: 'var(--lavender)', level: 3 },
    ],
  },
  {
    title: 'containers & ops',
    skills: [
      { name: 'Linux', icon: 'fa-brands fa-linux', color: 'var(--yellow)', level: 5 },
      { name: 'CI/CD', icon: 'fa-solid fa-gears', color: 'var(--mauve)', level: 4 },
      { name: 'Docker', icon: 'fa-brands fa-docker', color: 'var(--blue)', level: 4 },
      { name: 'Kubernetes', icon: 'si-kubernetes', color: 'var(--sapphire)', level: 3 },
    ],
  },
  {
    title: 'frameworks & runtimes',
    skills: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'var(--green)', level: 5 },
      { name: 'Spring Boot', icon: 'si-spring', color: 'var(--teal)', level: 3 },
      { name: 'React', icon: 'fa-brands fa-react', color: 'var(--sapphire)', level: 3, note: 'incl. React Native' },
      { name: 'Astro', icon: 'si-astro', color: 'var(--peach)', level: 2, note: 'this site' },
    ],
  },
  {
    title: 'tools',
    skills: [
      { name: 'Git & jj', icon: 'fa-brands fa-git-alt', color: 'var(--red)', level: 5 },
      { name: 'Hyprland & Omarchy', icon: 'si-hyprland', color: 'var(--teal)', level: 5, note: 'pidjezdy bar plugin' },
      { name: 'Nix', icon: 'si-nixos', color: 'var(--blue)', level: 3 },
      { name: 'PostgreSQL', icon: 'si-postgresql', color: 'var(--sapphire)', level: 3 },
    ],
  },
];

export const creative: SkillGroup[] = [
  {
    title: 'maker',
    skills: [
      { name: '3D printing', icon: 'fa-solid fa-cube', color: 'var(--peach)', level: 4 },
      { name: 'CAD (Fusion)', icon: 'fa-solid fa-compass-drafting', color: 'var(--sapphire)', level: 3 },
      { name: 'electronics', icon: 'fa-solid fa-microchip', color: 'var(--green)', level: 2 },
    ],
  },
  {
    title: 'art & sound',
    skills: [
      { name: 'DJing', icon: 'fa-solid fa-headphones', color: 'var(--mauve)', level: 4 },
      { name: 'music production', icon: 'fa-solid fa-sliders', color: 'var(--peach)', level: 2 },
      { name: 'drawing', icon: 'fa-solid fa-pen-nib', color: 'var(--pink)', level: 2 },
    ],
  },
  {
    title: 'words',
    skills: [
      { name: 'technical writing', icon: 'fa-solid fa-feather', color: 'var(--teal)', level: 3 },
      { name: 'public speaking', icon: 'fa-solid fa-person-chalkboard', color: 'var(--yellow)', level: 2 },
    ],
  },
  {
    title: 'just for fun',
    skills: [
      { name: 'ui theming', icon: 'fa-solid fa-brush', color: 'var(--mauve)', level: 5, note: 'catppuccin everything' },
      { name: 'scope management', icon: 'fa-solid fa-triangle-exclamation', color: 'var(--peach)', level: 1, note: 'see: every project I own' },
    ],
  },
];
