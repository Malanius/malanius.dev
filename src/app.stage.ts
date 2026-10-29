import { Aspects, Stage, type StageProps, Tag } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import type { AppInfo } from '@/common/app-info';
import { GitHubDeploy } from '@/deploy/github-deploy.stack';
import { CertificateStack } from '@/website/certificate.stack';
import { WebsiteContent } from '@/website/website-content.stack';
import { WebsiteInfra } from '@/website/website-infra.stack';

interface AppStageProps extends StageProps, AppInfo {}

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props: AppStageProps) {
    super(scope, id, props);

    const { appName, appEnv } = props;

    if (appEnv === 'prod') {
      new GitHubDeploy(this, 'gh-deploy', {
        stackName: `${appName}-${appEnv}-gh-deploy`,
        repository: 'Malanius/malanius.dev',
      });
    }

    const { certificate } = new CertificateStack(this, 'certificate', {
      stackName: `${appName}-${appEnv}-certificate`,
      env: { region: 'us-east-1' }, // CloudFront requires the certificate in us-east-1
      crossRegionReferences: true,
    });

    const infra = new WebsiteInfra(this, 'web-infra', {
      stackName: `${appName}-${appEnv}-web-infra`,
      appName,
      appEnv,
      certificate,
      crossRegionReferences: true,
    });

    const content = new WebsiteContent(this, 'web-content', {
      stackName: `${appName}-${appEnv}-web-content`,
      appName,
      appEnv,
    });
    content.addStackDependency(infra); // reads the bucket and distribution from SSM

    Aspects.of(this).add(new Tag('project', appName));
    Aspects.of(this).add(new Tag('env', appEnv));
  }
}
