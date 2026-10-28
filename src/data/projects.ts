export interface Project {
  name: string;
  status?: 'active' | 'wip' | 'done' | 'archived';
  description: string;
  tech: { icon: string; color: string; label: string }[];
  repo: string;
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
};

export const projects: Project[] = [
  {
    name: 'pidjezdy',
    status: 'active',
    description:
      'Prague public transport (PID) departures you can actually catch, in the terminal and the Omarchy top bar. Ranks reachable connections by route quotas and falls back to a cached snapshot when PID is down.',
    tech: [tech.rust, tech.omarchy, tech.linux],
    repo: 'https://github.com/malanius/pidjezdy',
  },
  {
    name: 'meido',
    status: 'active',
    description:
      "Serverless Discord bot on AWS, at Master's service. The event-driven design is proven in production, with plenty more features on the way.",
    tech: [tech.typescript, tech.aws, tech.discord],
    repo: 'https://github.com/malanius/meido',
  },
  {
    name: 'toggl-export',
    status: 'active',
    description:
      'CLI that turns Toggl time entries into weekly and monthly client reports. A Rust rewrite with an interactive TUI is planned.',
    tech: [tech.python],
    repo: 'https://github.com/malanius/toggl-export',
  },
  {
    name: 'cdk-ts-serverless-template',
    status: 'active',
    description:
      'projen template for AWS CDK apps in TypeScript, so new serverless projects start from a sane baseline.',
    tech: [tech.typescript, tech.aws],
    repo: 'https://github.com/malanius/cdk-ts-serverless-template',
  },
  {
    name: 'talks',
    status: 'active',
    description:
      "Slides and material from talks I've given: TypeScript and Node.js intros, OWASP broken access control, Serverlesspresso, and Conventional Commits.",
    tech: [tech.javascript, tech.html],
    repo: 'https://github.com/malanius/talks',
  },
  {
    name: 'bingorat',
    status: 'wip',
    description:
      'Bingo in the terminal, a Rust TUI built on ratatui. Grid generation and persistence still to come.',
    tech: [tech.rust, tech.tui],
    repo: 'https://github.com/malanius/bingorat',
  },
  {
    name: 'hyprwaifu',
    status: 'done',
    description:
      'A tiny script and systemd timer that cycles your wallpapers through hyprpaper (or awww, in the awwwaifu twin). Waifus optional, vibes mandatory.',
    tech: [tech.shell, tech.linux],
    repo: 'https://github.com/malanius/hyprwaifu',
  },
  {
    name: 'tmux-spotify-linux',
    status: 'done',
    description:
      'Linux port of the tmux-spotify plugin: a tmux menu for controlling Spotify over D-Bus instead of macOS-only binaries.',
    tech: [tech.shell, tech.spotify],
    repo: 'https://github.com/malanius/tmux-spotify-linux',
  },
  {
    name: 'strapi-provider-upload-aws-s3-cdn',
    status: 'done',
    description:
      'Strapi upload provider for S3 that works with private buckets behind a CloudFront CDN. Published on npm.',
    tech: [tech.javascript, tech.aws, tech.npm],
    repo: 'https://github.com/malanius/strapi-provider-upload-aws-s3-cdn',
  },
  {
    name: 'cdk-verified-ses-identity',
    status: 'archived',
    description:
      'AWS CDK construct that creates an SES identity and verifies it with DKIM records in a Route53 hosted zone.',
    tech: [tech.typescript, tech.aws],
    repo: 'https://github.com/malanius/cdk-verified-ses-identity',
  },
];
