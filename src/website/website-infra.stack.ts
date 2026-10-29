import { RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import type { Construct } from 'constructs';

import type { AppInfo } from '@/common/app-info';

import { WebsiteCloudFront } from './cloudfront';
import { WebsiteDns } from './dns';
import { domainName, hostedZoneId } from './domain';
import { distributionDomainParameterName, distributionIdParameterName, websiteBucketParameterName } from './parameters';

interface WebsiteInfraProps extends StackProps, AppInfo {
  certificate: ICertificate;
}

/** Bucket, CloudFront and DNS; published to SSM for the content stack */
export class WebsiteInfra extends Stack {
  constructor(scope: Construct, id: string, props: WebsiteInfraProps) {
    super(scope, id, props);

    const { certificate } = props;

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId,
      zoneName: domainName,
    });

    // Content is rebuilt from the repo on every deploy, nothing to keep
    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const { distribution } = new WebsiteCloudFront(this, 'WebsiteCloudFront', { websiteBucket, certificate });

    new WebsiteDns(this, 'WebsiteDns', { hostedZone, distribution });

    new StringParameter(this, 'WebsiteBucketName', {
      parameterName: websiteBucketParameterName(props),
      stringValue: websiteBucket.bucketName,
    });
    new StringParameter(this, 'DistributionId', {
      parameterName: distributionIdParameterName(props),
      stringValue: distribution.distributionId,
    });
    new StringParameter(this, 'DistributionDomain', {
      parameterName: distributionDomainParameterName(props),
      stringValue: distribution.domainName,
    });
  }
}
