import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Define the structure of the configuration for strong typing
export interface EnvConfig {
  envName: string;
  web: {
    baseUrl: string;
    users: {
      [key: string]: {
        username: string;
        password: string;
      };
    };
  };
  mobile: {
    appPath: string;
    deviceName: string;
    platformName: string;
    appPackage?: string;
    appActivity?: string;
    udid?: string;
    noReset?: boolean;
    fullReset?: boolean;
  };
  api: {
    baseUrl: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  testData: {
    welcomeMessage: string;
    defaultTimeout: number;
  };
}

// Get directory name equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read ENV variable, default to 'dev' if not specified
const env = (process.env.ENV || 'dev').toLowerCase();
const validEnvs = ['dev', 'sit', 'stg'];

if (!validEnvs.includes(env)) {
  throw new Error(`Invalid environment: "${env}". Expected one of: ${validEnvs.join(', ')}`);
}

const configFilePath = path.resolve(__dirname, `./envs/${env}.json`);

let rawConfig: string;
try {
  rawConfig = fs.readFileSync(configFilePath, 'utf8');
} catch (error) {
  throw new Error(`Failed to load config file for environment "${env}" at: ${configFilePath}. Error: ${(error as Error).message}`);
}

export const config: EnvConfig = JSON.parse(rawConfig);
console.log(`[Config] Loaded environment config: ${env.toUpperCase()}`);
