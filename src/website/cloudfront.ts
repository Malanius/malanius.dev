import * as path from 'node:path';

import { CfnOutput, Duration } from 'aws-cdk-lib';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
  CachePolicy,
  Function as CloudFrontFunction,
  Distribution,
  FunctionCode,
  FunctionEventType,
  HttpVersion,
  PriceClass,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import type { IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { domainName } from './domain';

export interface WebsiteCloudFrontProps {
  websiteBucket: IBucket;
  certificate: ICertificate;
}

export class WebsiteCloudFront extends Construct {
  public readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: WebsiteCloudFrontProps) {
    super(scope, id);

    const { websiteBucket, certificate } = props;

    // Without s3:ListBucket, S3 answers 403 for missing objects; both map to the 404 page
    const notFound = { responseHttpStatus: 404, responsePagePath: '/404.html', ttl: Duration.minutes(1) };

    this.distribution = new Distribution(this, 'Distribution', {
      domainNames: [domainName, `www.${domainName}`],
      certificate,
      defaultRootObject: 'index.html',
      priceClass: PriceClass.PRICE_CLASS_ALL,
      httpVersion: HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: ResponseHeadersPolicy.SECURITY_HEADERS,
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: new CloudFrontFunction(this, 'ViewerRequest', {
              code: FunctionCode.fromFile({ filePath: path.join(__dirname, 'viewer-request.js') }),
            }),
          },
        ],
      },
      errorResponses: [
        { httpStatus: 403, ...notFound },
        { httpStatus: 404, ...notFound },
      ],
    });

    new CfnOutput(this, 'DistributionId', { value: this.distribution.distributionId });
  }
}
