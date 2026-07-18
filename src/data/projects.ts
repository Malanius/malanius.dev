export interface Project {
  name: string;
  status?: 'active' | 'wip';
  description: string;
  tech: { icon: string; color: string; label: string }[];
  repo: string;
}

export const projects: Project[] = [
  {
    name: 'senpai-notifier',
    description:
      'CLI tool that watches anime release schedules and pings you when a new episode drops. Notice me.',
    tech: [
      { icon: 'fa-brands fa-rust', color: 'var(--peach)', label: 'Rust' },
      { icon: 'fa-brands fa-docker', color: 'var(--blue)', label: 'Docker' },
    ],
    repo: 'https://github.com/malanius/senpai-notifier',
  },
  {
    name: 'mango-reader',
    status: 'active',
    description:
      'Self-hosted manga library and reader with OPDS support and reading-progress sync across devices.',
    tech: [
      { icon: 'fa-brands fa-golang', color: 'var(--sapphire)', label: 'Go' },
      { icon: 'fa-brands fa-vuejs', color: 'var(--green)', label: 'Vue' },
      { icon: 'fa-brands fa-docker', color: 'var(--blue)', label: 'Docker' },
    ],
    repo: 'https://github.com/malanius/mango-reader',
  },
  {
    name: 'dotfiles',
    description:
      'Nix-managed system config. Catppuccin everywhere, obviously. My most-maintained project by far.',
    tech: [
      { icon: 'fa-brands fa-linux', color: 'var(--yellow)', label: 'Linux' },
      { icon: 'fa-solid fa-terminal', color: 'var(--teal)', label: 'Shell' },
    ],
    repo: 'https://github.com/malanius/dotfiles',
  },
  {
    name: 'pixel-shrine',
    status: 'wip',
    description:
      'Tiny canvas game about maintaining a mountain shrine. Pixel art by me, which explains a lot.',
    tech: [
      { icon: 'fa-brands fa-js', color: 'var(--yellow)', label: 'JavaScript' },
      { icon: 'fa-brands fa-html5', color: 'var(--peach)', label: 'HTML5' },
    ],
    repo: 'https://github.com/malanius/pixel-shrine',
  },
];
