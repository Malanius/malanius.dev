import { awscdk } from 'projen';
import { type AddBundleOptions, TypeScriptModuleResolution } from 'projen/lib/javascript';
import { NodePackageManager } from 'projen/lib/javascript/node-package';
import { ReleaseTrigger } from 'projen/lib/release';

import { biomeOptions } from './projenrc/biome';
import { context } from './projenrc/cdk';

const cdkVersion = '2.274.0';
const powertoolsVersion = 'v2.36.0';
const awsSdkVersion = '3.1155.0';
const middyVersion = '7.9.2';

const lambdaBundling = {
  externals: [],
  sourcemap: true,
  mainFields: ['module', 'main'],
  minify: true,
  format: 'esm',
  outfile: 'index.mjs',
  banner: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);",
} satisfies Partial<AddBundleOptions>;

const project = new awscdk.AwsCdkTypeScriptApp({
  name: 'malanius.dev',
  authorName: 'Michal Slota',
  authorEmail: 'malaniusprivierre@gmail.com',

  cdkVersion,
  cdkVersionPinning: true,

  release: false,
  releaseTrigger: ReleaseTrigger.manual(),
  defaultReleaseBranch: 'main',
  github: false,

  packageManager: NodePackageManager.BUN,

  projenrcTs: true,
  tsconfig: {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      moduleResolution: TypeScriptModuleResolution.BUNDLER,
      lib: ['esnext'],
      types: ['aws-lambda', 'bun-types', 'node'],
      typeRoots: ['./node_modules/@types', './node_modules'],
      emitDecoratorMetadata: true,
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true,
      paths: {
        '@/*': ['./src/*'],
      },
    },
  },

  // No need for jest with Bun
  jest: false,

  biome: true,
  biomeOptions,

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_24_X,
    awsSdkConnectionReuse: false, // not needed for sdk v3
    bundlingOptions: lambdaBundling,
  },

  deps: [
    // AWS Lambda Powertools dependencies
    `@aws-lambda-powertools/batch@${powertoolsVersion}`,
    `@aws-lambda-powertools/logger@${powertoolsVersion}`,
    `@aws-lambda-powertools/parameters@${powertoolsVersion}`,
    `@aws-lambda-powertools/parser@${powertoolsVersion}`,
    `@aws-lambda-powertools/tracer@${powertoolsVersion}`,
    `@aws-lambda-powertools/validation@${powertoolsVersion}`,

    // AWS SDK dependencies
    `@aws-sdk/client-secrets-manager@${awsSdkVersion}`,

    // Middy middleware dependencies
    `@middy/core@${middyVersion}`,

    // TODO: add any other dependencies your project requires
    'zod@~4',
  ],
  devDeps: [
    '@commitlint/config-conventional',
    '@types/aws-lambda',
    'bun-types',
    'commitlint',
    'cz-conventional-changelog',
    'lefthook',
  ],
  context,
});

project.defaultTask?.reset('bun .projenrc.ts');
project.compileTask.exec('bun run tsc --project tsconfig.json --noEmit');
project.cdkConfig.json.addOverride('build', 'bunx projen compile && bunx projen bundle');

project.addTask('prepare', {
  exec: 'bunx lefthook install',
});

project.addTask('check', {
  description: 'Check the code style and formatting',
  exec: 'bunx biome check --write',
});

// The Astro site lives in website/ with its own package.json
project.gitignore.exclude('.env', '.playwright-mcp/');

project.addTask('web:install', {
  description: 'Install the website dependencies',
  cwd: 'website',
  exec: 'bun install --frozen-lockfile',
});

project.addTask('web:build', {
  description: 'Build the website into website/dist, deployed by the web content stack',
  cwd: 'website',
  exec: 'bun run build',
});

project.addTask('check:staged', {
  description: 'Check the code style and formatting for staged files',
  exec: 'bunx biome check --write --staged',
});

project.synth();
