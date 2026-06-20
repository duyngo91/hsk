import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export interface UserInputData {
  payment: {
    cardNumber: string;
    cardHolder: string;
    amount: string;
    gatewayUrl: string;
  };
  search: {
    keyword: string;
    expectedResultsCount: number;
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = (process.env.ENV || 'dev').toLowerCase();
const dataFilePath = path.resolve(__dirname, `./${env}/user-input.json`);

let rawData: string;
try {
  rawData = fs.readFileSync(dataFilePath, 'utf8');
} catch (error) {
  throw new Error(`Failed to load test data for environment "${env}" at: ${dataFilePath}. Error: ${(error as Error).message}`);
}

export const testData: UserInputData = JSON.parse(rawData);
console.log(`[Test Data] Loaded environment test data: ${env.toUpperCase()}`);
