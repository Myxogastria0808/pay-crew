export type EnvConfig = {
  frontendConfig: FrontendConfig;
  backendConfig: DatabaseConfig;
};

export type FrontendConfig = {
  ViteApiUrl: string;
  ViteSentryDsn: string;
  SentryAuthToken: string;
  SentryOrg: string;
  SentryProject: string;
};

export type DatabaseConfig = {
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
  postgresPort: number;
};
