export type EnvConfig = {
  frontendConfig: FrontendConfig;
  backendConfig: DatabaseConfig;
};

export type FrontendConfig = {
  viteApiUrl: string;
  viteSentryDsn: string;
  sentryAuthToken: string;
  sentryOrg: string;
  sentryProject: string;
};

export type DatabaseConfig = {
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
  postgresPort: number;
};
