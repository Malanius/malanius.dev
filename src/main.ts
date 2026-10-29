#!/usr/bin/env node
import { env } from 'node:process';

import { App } from 'aws-cdk-lib';

import { AppStage } from './app.stage';

const appName = 'malanius-dev';
// Single environment, no previews
const appEnv = env.APP_ENV || 'prod';
const app = new App();

new AppStage(app, appEnv, {
  appName,
  appEnv,
  // Explicit env is required for the cross-region certificate reference
  env: { account: env.CDK_DEFAULT_ACCOUNT, region: 'eu-west-1' },
});

app.synth();
