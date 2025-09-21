import dotenv from 'dotenv';
import fs from 'fs';
import { DatabaseConfig } from './types';

export const dotenvLoader = (): DatabaseConfig => {
  dotenv.config();
  console.info('Environment variables loaded from .env file.');
  console.table({
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? '******' : null,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
  });

  const dbConfig: DatabaseConfig = {
    postgresUser: process.env.POSTGRES_USER || null,
    postgresPassword: process.env.POSTGRES_PASSWORD || null,
    postgresDb: process.env.POSTGRES_DB || null,
    postgresPort: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : null,
  };

  if (!dbConfig.postgresUser || !dbConfig.postgresPassword || !dbConfig.postgresDb || !dbConfig.postgresPort) {
    throw new Error('Failed to load required database configuration in environment variables.');
  }

  return dbConfig;
};

export const fileWriter = (path: string, data: string) => {
  fs.writeFile(path, data, (error) => {
    if (error) {
      throw new Error(`Failed to write ${path}.`);
    }
  });
  console.info(`Succeeded to write ${path}.`);
};
