import { Aspects, Stage, type StageProps, Tag } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import type { AppInfo } from '@/common/app-info';

interface AppStageProps extends StageProps, AppInfo {}

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props: AppStageProps) {
    super(scope, id, props);

    const { appName, appEnv } = props;

    Aspects.of(this).add(new Tag('project', appName));
    Aspects.of(this).add(new Tag('env', appEnv));
  }
}
