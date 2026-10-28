interface Social {
  label: string;
  href: string;
  color: string;
  /** Font Awesome classes, or a key from brandIcons */
  icon: string;
}

export const socials: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/malanius',
    icon: 'fa-brands fa-github',
    color: 'var(--text)',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/malanius/',
    icon: 'fa-brands fa-linkedin',
    color: 'var(--sapphire)',
  },
  {
    label: 'SoundCloud',
    href: 'https://soundcloud.com/malanius',
    icon: 'fa-brands fa-soundcloud',
    color: 'var(--yellow)',
  },
  {
    label: 'Mixcloud',
    href: 'https://www.mixcloud.com/malanius/',
    icon: 'fa-brands fa-mixcloud',
    color: 'var(--teal)',
  },
  {
    label: 'Steam',
    href: 'https://steamcommunity.com/id/malanius',
    icon: 'fa-brands fa-steam',
    color: 'var(--blue)',
  },
  {
    label: 'MyAnimeList',
    href: 'https://myanimelist.net/profile/malanius',
    icon: 'si-myanimelist',
    color: 'var(--mauve)',
  },
  {
    label: 'Email',
    href: 'mailto:null@malanius.dev',
    icon: 'fa-solid fa-envelope',
    color: 'var(--peach)',
  },
];
