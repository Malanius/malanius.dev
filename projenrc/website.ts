import { javascript, type Project } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript/node-package';

/**
 * The Astro site in website/, as a projen subproject with its own package.json and bun.lock.
 * Astro owns the build; projen only manages the package, its dependencies and the tasks.
 */
export function websiteProject(parent: Project) {
  const web = new javascript.NodeProject({
    parent,
    outdir: 'website',
    name: 'malanius-dot-dev',
    defaultReleaseBranch: 'main',
    packageManager: NodePackageManager.BUN,
    minNodeVersion: '26.0.0',
    entrypoint: '', // not a library, no `main`

    deps: ['astro@^5.0.0'],
    devDeps: ['@types/node@^26.6.6'],

    // Nothing to publish, test or lint here; the root project's Biome covers website/
    release: false,
    package: false,
    licensed: false,
    jest: false,
    npmignoreEnabled: false,
    dependabot: false,
    depsUpgrade: false,
    pullRequestTemplate: false,
    // projen always writes a README for subprojects; only when it's missing
    readme: { contents: '# website\n\nThe Astro site for malanius.dev. See the root README.md.\n' },

    gitignore: [
      'dist/',
      '.astro/',
      '.env',
      '.env.production',
      '.playwright-mcp/',
      'pnpm-debug.log*',
      '.DS_Store',
      '.idea/',
    ],
  });

  web.package.addField('type', 'module');
  web.package.addField('private', true);
  web.package.file.addDeletionOverride('publishConfig');

  // `projen build` runs the Astro build into website/dist
  web.compileTask.exec('astro build');

  web.addTask('dev', { description: 'Run the dev server on http://localhost:4321', exec: 'astro dev' });
  web.addTask('preview', { description: 'Serve the built site from website/dist', exec: 'astro preview' });

  return web;
}
