export type EnvConfig = {
  frontendConfig: FrontendConfig;
  backendConfig: DatabaseConfig;
};

export type FrontendConfig = {
  VITE_API_URL: string;
  VITE_SENTRY_DSN: string;
  SENTRY_AUTH_TOKEN: string;
  SENTRY_ORG: string;
  SENTRY_PROJECT: string;
};

export type DatabaseConfig = {
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
  postgresPort: number;
};
