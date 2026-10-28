interface Social {
  label: string;
  href: string;
  color: string;
  /** Font Awesome classes */
  icon?: string;
  /** SVG path on a 24×24 viewBox, for brands Font Awesome doesn't ship */
  svgPath?: string;
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
    // Simple Icons (CC0)
    svgPath:
      'M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z',
    color: 'var(--mauve)',
  },
  {
    label: 'Email',
    href: 'mailto:null@malanius.dev',
    icon: 'fa-solid fa-envelope',
    color: 'var(--peach)',
  },
];
