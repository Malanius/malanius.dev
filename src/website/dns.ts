import { CfnOutput } from 'aws-cdk-lib';
import type { IDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { AaaaRecord, ARecord, type IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

export interface WebsiteDnsProps {
  hostedZone: IHostedZone;
  distribution: IDistribution;
}

/** Apex and www, IPv4 and IPv6; the www redirect itself happens in the viewer request function */
export class WebsiteDns extends Construct {
  constructor(scope: Construct, id: string, props: WebsiteDnsProps) {
    super(scope, id);

    const { hostedZone, distribution } = props;
    const target = RecordTarget.fromAlias(new CloudFrontTarget(distribution));

    for (const [name, recordName] of [
      ['Apex', hostedZone.zoneName],
      ['Www', `www.${hostedZone.zoneName}`],
    ]) {
      new ARecord(this, `${name}A`, { zone: hostedZone, recordName, target });
      new AaaaRecord(this, `${name}Aaaa`, { zone: hostedZone, recordName, target });
    }

    new CfnOutput(this, 'WebsiteUrl', { value: `https://${hostedZone.zoneName}` });
  }
}
