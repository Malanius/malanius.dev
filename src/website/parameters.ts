import type { AppInfo } from '@/common/app-info';

export const websiteBucketParameterName = ({ appName, appEnv }: AppInfo) => `/${appEnv}/${appName}/website-bucket-name`;

export const distributionIdParameterName = ({ appName, appEnv }: AppInfo) =>
  `/${appEnv}/${appName}/website-distribution-id`;

export const distributionDomainParameterName = ({ appName, appEnv }: AppInfo) =>
  `/${appEnv}/${appName}/website-distribution-domain`;
