import * as path from 'node:path';

import { Stack, type StackProps } from 'aws-cdk-lib';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import type { Construct } from 'constructs';

import type { AppInfo } from '@/common/app-info';

import { distributionDomainParameterName, distributionIdParameterName, websiteBucketParameterName } from './parameters';

interface WebsiteContentProps extends StackProps, AppInfo {}

/** Built site from website/dist; run `bunx projen web:build` before synth */
export class WebsiteContent extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteContentProps) {
    super(scope, id, props);

    const bucketName = StringParameter.valueForStringParameter(this, websiteBucketParameterName(props));

    const destinationBucket = Bucket.fromBucketName(this, 'WebsiteBucket', bucketName);

    const distribution = Distribution.fromDistributionAttributes(this, 'Distribution', {
      distributionId: StringParameter.valueForStringParameter(this, distributionIdParameterName(props)),
      domainName: StringParameter.valueForStringParameter(this, distributionDomainParameterName(props)),
    });

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset(path.join(__dirname, '../../website/dist'))],
      destinationBucket,
      distribution,
      distributionPaths: ['/*'],
      memoryLimit: 512,
    });
  }
}
