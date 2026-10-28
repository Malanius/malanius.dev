export interface Project {
  name: string;
  status?: 'active' | 'wip' | 'done' | 'archived';
  description: string;
  tech: { icon: string; color: string; label: string }[];
  links?: { icon: string; href: string; label: string }[];
}

const tech = {
  rust: { icon: 'fa-brands fa-rust', color: 'var(--peach)', label: 'Rust' },
  typescript: { icon: 'si-typescript', color: 'var(--blue)', label: 'TypeScript' },
  javascript: { icon: 'fa-brands fa-js', color: 'var(--yellow)', label: 'JavaScript' },
  python: { icon: 'fa-brands fa-python', color: 'var(--yellow)', label: 'Python' },
  html: { icon: 'fa-brands fa-html5', color: 'var(--peach)', label: 'HTML5' },
  shell: { icon: 'fa-solid fa-terminal', color: 'var(--teal)', label: 'Shell' },
  linux: { icon: 'fa-brands fa-linux', color: 'var(--yellow)', label: 'Linux' },
  aws: { icon: 'fa-brands fa-aws', color: 'var(--peach)', label: 'AWS' },
  discord: { icon: 'fa-brands fa-discord', color: 'var(--lavender)', label: 'Discord' },
  npm: { icon: 'fa-brands fa-npm', color: 'var(--red)', label: 'npm' },
  tui: { icon: 'fa-solid fa-table-cells', color: 'var(--green)', label: 'ratatui' },
  omarchy: { icon: 'fa-solid fa-puzzle-piece', color: 'var(--mauve)', label: 'Omarchy plugin (QML)' },
  spotify: { icon: 'fa-brands fa-spotify', color: 'var(--green)', label: 'Spotify' },
  esp32: { icon: 'fa-solid fa-microchip', color: 'var(--green)', label: 'ESP32' },
  slack: { icon: 'fa-brands fa-slack', color: 'var(--pink)', label: 'Slack' },
  print3d: { icon: 'fa-solid fa-cube', color: 'var(--peach)', label: '3D printing' },
  dj: { icon: 'fa-solid fa-headphones', color: 'var(--mauve)', label: 'DJing' },
  krita: { icon: 'fa-solid fa-paintbrush', color: 'var(--pink)', label: 'Krita' },
};

const github = (repo: string) => ({
  icon: 'fa-brands fa-github',
  href: `https://github.com/malanius/${repo}`,
  label: 'GitHub',
});

export const code: Project[] = [
  {
    name: 'pidjezdy',
    status: 'active',
    description:
      'Prague public transport (PID) departures you can actually catch, in the terminal and the Omarchy top bar. Ranks reachable connections by route quotas and falls back to a cached snapshot when PID is down.',
    tech: [tech.rust, tech.omarchy, tech.linux],
    links: [github('pidjezdy')],
  },
  {
    name: 'meido',
    status: 'active',
    description:
      "Serverless Discord bot on AWS, at Master's service. The event-driven design is proven in production, with plenty more features on the way.",
    tech: [tech.typescript, tech.aws, tech.discord],
    links: [github('meido')],
  },
  {
    name: 'toggl-export',
    status: 'active',
    description:
      'CLI that turns Toggl time entries into weekly and monthly client reports. A Rust rewrite with an interactive TUI is planned.',
    tech: [tech.python],
    links: [github('toggl-export')],
  },
  {
    name: 'cdk-ts-serverless-template',
    status: 'active',
    description:
      'projen template for AWS CDK apps in TypeScript, so new serverless projects start from a sane baseline.',
    tech: [tech.typescript, tech.aws],
    links: [github('cdk-ts-serverless-template')],
  },
  {
    name: 'talks',
    status: 'active',
    description:
      "Slides and material from talks I've given: TypeScript and Node.js intros, OWASP broken access control, Serverlesspresso, and Conventional Commits.",
    tech: [tech.javascript, tech.html],
    links: [github('talks')],
  },
  {
    name: 'bingorat',
    status: 'wip',
    description:
      'Bingo in the terminal, a Rust TUI built on ratatui. Grid generation and persistence still to come.',
    tech: [tech.rust, tech.tui],
    links: [github('bingorat')],
  },
  {
    name: 'hyprwaifu',
    status: 'done',
    description:
      'A tiny script and systemd timer that cycles your wallpapers through hyprpaper (or awww, in the awwwaifu twin). Waifus optional, vibes mandatory.',
    tech: [tech.shell, tech.linux],
    links: [github('hyprwaifu')],
  },
  {
    name: 'tmux-spotify-linux',
    status: 'done',
    description:
      'Linux port of the tmux-spotify plugin: a tmux menu for controlling Spotify over D-Bus instead of macOS-only binaries.',
    tech: [tech.shell, tech.spotify],
    links: [github('tmux-spotify-linux')],
  },
  {
    name: 'strapi-provider-upload-aws-s3-cdn',
    status: 'done',
    description:
      'Strapi upload provider for S3 that works with private buckets behind a CloudFront CDN. Published on npm.',
    tech: [tech.javascript, tech.aws, tech.npm],
    links: [github('strapi-provider-upload-aws-s3-cdn')],
  },
  {
    name: 'cdk-verified-ses-identity',
    status: 'archived',
    description:
      'AWS CDK construct that creates an SES identity and verifies it with DKIM records in a Route53 hosted zone.',
    tech: [tech.typescript, tech.aws],
    links: [github('cdk-verified-ses-identity')],
  },
];

export const maker: Project[] = [
  {
    name: 'toilet-monitor',
    status: 'wip',
    description:
      'ESP32 door sensor that posts toilet occupancy to Slack through AWS IoT Core and a serverless backend. Hardware prototype done, backend next.',
    tech: [tech.esp32, tech.aws, tech.slack],
  },
  {
    name: 'whiteboard-stencil',
    status: 'active',
    description: '3D-printable whiteboard stencil, remixed from an existing model. Printables upload coming.',
    tech: [tech.print3d],
  },
];

export const creative: Project[] = [
  {
    name: 'dj-mixes',
    status: 'active',
    description: "Mixes I've recorded, up on SoundCloud and Mixcloud.",
    tech: [tech.dj],
    links: [
      { icon: 'fa-brands fa-soundcloud', href: 'https://soundcloud.com/malanius', label: 'SoundCloud' },
      { icon: 'fa-brands fa-mixcloud', href: 'https://www.mixcloud.com/malanius/', label: 'Mixcloud' },
    ],
  },
  {
    name: 'drawing-practice',
    status: 'wip',
    description: 'Learning digital drawing in Krita, starting with traces of art I love to get the line work right.',
    tech: [tech.krita],
  },
];
