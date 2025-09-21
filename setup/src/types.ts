export type EnvConfig = {
  frontendConfig: FrontendConfig;
  backendConfig: DatabaseConfig;
};

export type FrontendConfig = {
  VITE_SENTRY_DSN: string | null;
  SENTRY_AUTH_TOKEN: string | null;
  SENTRY_ORG: string | null;
  SENTRY_PROJECT: string | null;
};

export type DatabaseConfig = {
  postgresUser: string | null;
  postgresPassword: string | null;
  postgresDb: string | null;
  postgresPort: number | null;
};
