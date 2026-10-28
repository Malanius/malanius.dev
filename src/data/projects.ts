export interface Project {
  name: string;
  status?: 'active' | 'wip' | 'planned' | 'done' | 'archived';
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
  prusaSlicer: { icon: 'fa-solid fa-layer-group', color: 'var(--peach)', label: 'PrusaSlicer' },
  raspberryPi: { icon: 'fa-brands fa-raspberry-pi', color: 'var(--red)', label: 'Raspberry Pi' },
  ledMatrix: { icon: 'fa-solid fa-table-cells-large', color: 'var(--green)', label: 'RGB LED matrix' },
  fusion: { icon: 'fa-solid fa-compass-drafting', color: 'var(--sapphire)', label: 'Fusion' },
  dj: { icon: 'fa-solid fa-headphones', color: 'var(--mauve)', label: 'DJing' },
  production: { icon: 'fa-solid fa-sliders', color: 'var(--peach)', label: 'FL Studio' },
  digitalArt: { icon: 'fa-solid fa-pen-nib', color: 'var(--pink)', label: 'Clip Studio Paint' },
  traditionalArt: { icon: 'fa-solid fa-pencil', color: 'var(--yellow)', label: 'traditional media' },
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
      'AWS CDK construct that creates an SES identity and verifies it with DKIM records in a Route53 hosted zone. Archived now that CDK does this itself.',
    tech: [tech.typescript, tech.aws],
    links: [github('cdk-verified-ses-identity')],
  },
];

export const maker: Project[] = [
  {
    name: 'whiteboard-stencil',
    status: 'active',
    description:
      'Magnetic whiteboard planner, remodeled from scratch in Fusion after a weekly schedule on Printables. Scaled down for the Prusa MINI bed, with smaller magnets and blank headers so it works for more than a weekly calendar.',
    tech: [tech.fusion, tech.prusaSlicer, tech.print3d],
  },
  {
    name: 'toilet-monitor',
    status: 'wip',
    description:
      'ESP32 door sensor that reports toilet occupancy through AWS IoT Core and a serverless backend, to Slack first with more channels planned. Hardware prototype done; firmware moving to Rust, backend next.',
    tech: [tech.esp32, tech.rust, tech.aws, tech.slack],
  },
  {
    name: 'c3-rust-playground',
    status: 'planned',
    description:
      "An ESP32-C3-DevKit-RUST-2 on my desk, to see how far embedded Rust has come since the NodeMCU days. A real project for it will follow once I know what it's good at.",
    tech: [tech.esp32, tech.rust],
  },
  {
    name: 'led-info-board',
    status: 'planned',
    description:
      'Wall info board built from 64×64 RGB LED matrix panels on a Raspberry Pi, for departures, weather and notifications. The departures part already spun off into pidjezdy.',
    tech: [tech.raspberryPi, tech.ledMatrix],
  },
];

export const creative: Project[] = [
  {
    name: 'dj-mixes',
    status: 'active',
    description: 'DJ mixes, recorded and up on Mixcloud.',
    tech: [tech.dj],
    links: [{ icon: 'fa-brands fa-mixcloud', href: 'https://www.mixcloud.com/malanius/', label: 'Mixcloud' }],
  },
  {
    name: 'music-production',
    status: 'wip',
    description: 'Making my own tracks. Whatever turns out shareable lands on SoundCloud.',
    tech: [tech.production],
    links: [{ icon: 'fa-brands fa-soundcloud', href: 'https://soundcloud.com/malanius', label: 'SoundCloud' }],
  },
  {
    name: 'drawing',
    status: 'wip',
    description: 'Learning and experimenting with drawing, from digital to classic styles.',
    tech: [tech.digitalArt, tech.traditionalArt],
  },
];
