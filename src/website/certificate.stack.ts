import { Stack, type StackProps } from 'aws-cdk-lib';
import { Certificate, CertificateValidation, KeyAlgorithm } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import type { Construct } from 'constructs';

import { domainName, hostedZoneId } from './domain';

/** Must be deployed to us-east-1, CloudFront only takes certificates from there */
export class CertificateStack extends Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId,
      zoneName: domainName,
    });

    this.certificate = new Certificate(this, 'Certificate', {
      domainName,
      subjectAlternativeNames: [`www.${domainName}`],
      keyAlgorithm: KeyAlgorithm.EC_PRIME256V1,
      validation: CertificateValidation.fromDns(hostedZone),
    });
  }
}
