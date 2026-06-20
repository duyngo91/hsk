import { FullConfig } from '@playwright/test';

/**
 * Global Teardown hook. Runs once after all workers and tests finish.
 * Perfect for cleanup operations, sending email/Slack report alerts, and shutting down connections.
 */
async function globalTeardown(fullConfig: FullConfig) {
  console.log('\n==================================================');
  console.log('[Global Teardown] Cleaning up global resources...');
  console.log('[Global Teardown] Closing any remaining database connections...');
  console.log('[Global Teardown] Compiling final test results...');
  console.log('[Global Teardown] Test execution finished. Exiting...');
  console.log('==================================================\n');
}

export default globalTeardown;
