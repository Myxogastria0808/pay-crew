import fs from 'fs';
import { dotenvLoader, fileWriter } from './functions';

const main = () => {
  // Change directory to the project root where the .env file is located
  process.chdir('../');

  // Check current directory is project root
  if (!fs.existsSync('pay-crew')) {
    throw new Error('This script must be run from the root directory of the project.');
  }

  // Load environment variables from .env file
  const dbConfig = dotenvLoader();

  // Create secret configuration files
  const wranglerData = `{
    "name": "pay-crew-backend",
    "main": "src/index.ts",
    "compatibility_date": "2025-09-21",
    "compatibility_flags": [
        "nodejs_compat"
    ],
    "hyperdrive": [
        {
            "binding": "HYPERDRIVE",
            "id": "dummy",
            "localConnectionString": "postgresql://${dbConfig.postgresUser}:${dbConfig.postgresPassword}@localhost:${dbConfig.postgresPort}/${dbConfig.postgresDb}"
        }
    ]
}
`;
  fileWriter('./products/backend/wrangler.local.jsonc', wranglerData);

  const dotEnvData = `POSTGRES_URL=postgresql://${dbConfig.postgresUser}:${dbConfig.postgresPassword}@localhost:${dbConfig.postgresPort}/${dbConfig.postgresDb}
`;
  fileWriter('./products/backend/.env', dotEnvData);
};

main();
