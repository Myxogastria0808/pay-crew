import dotenv from 'dotenv';
import fs from 'fs';
import { DatabaseConfig, EnvConfig, FrontendConfig } from './types';

export const dotenvLoader = (): EnvConfig => {
  dotenv.config();
  console.info('Environment variables loaded from .env file');
  console.table({
    VITE_SENTRY_DSN: process.env.VITE_SENTRY_DSN ? '*****' : '',
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN ? '*****' : '',
    SENTRY_ORG: process.env.SENTRY_ORG ?? '',
    SENTRY_PROJECT: process.env.SENTRY_PROJECT ?? '',
    POSTGRES_USER: process.env.POSTGRES_USER ?? '',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? '*****' : '',
    POSTGRES_DB: process.env.POSTGRES_DB ?? '',
    POSTGRES_PORT: process.env.POSTGRES_PORT ?? '',
  });

  const frontendConfig: FrontendConfig = {
    VITE_SENTRY_DSN: process.env.VITE_SENTRY_DSN ?? null,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN ?? null,
    SENTRY_ORG: process.env.SENTRY_ORG ?? null,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT ?? null,
  };
  const backendConfig: DatabaseConfig = {
    postgresUser: process.env.POSTGRES_USER ?? null,
    postgresPassword: process.env.POSTGRES_PASSWORD ?? null,
    postgresDb: process.env.POSTGRES_DB ?? null,
    postgresPort: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : null,
  };

  if (
    !frontendConfig.VITE_SENTRY_DSN ||
    !frontendConfig.SENTRY_AUTH_TOKEN ||
    !frontendConfig.SENTRY_ORG ||
    !frontendConfig.SENTRY_PROJECT ||
    !backendConfig.postgresUser ||
    !backendConfig.postgresPassword ||
    !backendConfig.postgresDb ||
    !backendConfig.postgresPort
  ) {
    throw new Error('Missing required project configuration in environment variables');
  }

  const envConfig = {
    frontendConfig,
    backendConfig,
  };

  return envConfig;
};

export const fileWriter = (path: string, data: string) => {
  fs.writeFile(path, data, (error) => {
    if (error) {
      throw new Error(`Failed to write ${path}: ${error.message}`);
    }
  });
  console.info(`Succeeded to write ${path}`);
};
