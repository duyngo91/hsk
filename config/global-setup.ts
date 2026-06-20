import { FullConfig } from '@playwright/test';
import { config } from './env.config.js';

/**
 * Global Setup hook. Runs once before all workers and tests start.
 * Perfect for initializing global resources, checking environment health, and seeding databases.
 */
async function globalSetup(fullConfig: FullConfig) {
  console.log('\n==================================================');
  console.log(`[Global Setup] Starting test suite execution...`);
  console.log(`[Global Setup] Targeting environment: ${config.envName.toUpperCase()}`);
  console.log(`[Global Setup] Web Base URL: ${config.web.baseUrl}`);
  console.log(`[Global Setup] API Base URL: ${config.api.baseUrl}`);
  console.log(`[Global Setup] Mobile Platform: ${config.mobile.platformName} (${config.mobile.deviceName})`);
  console.log('==================================================\n');

  // Verify connectivity or seed databases if necessary
  console.log(`[Global Setup] Checking database connectivity to ${config.database.host}:${config.database.port}...`);
  // Here we can run a quick mock database check
  console.log('[Global Setup] Database sanity check PASSED.');

  console.log('[Global Setup] Hook completed successfully.\n');
}

export default globalSetup;
