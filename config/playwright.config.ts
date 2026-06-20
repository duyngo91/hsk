import { defineConfig, devices } from '@playwright/test';
import { config as envConfig } from './env.config.js';

/**
 * Playwright Runner configuration.
 * Configured to read environment configurations and define target browsers / mobile emulation devices.
 */
export default defineConfig({
  testDir: '../tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    // Set base URL dynamically from environment config file
    baseURL: envConfig.web.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Web Desktop testing
    {
      name: 'chromium',
      testIgnore: [/.*hybrid.*/, /.*mobile.*/],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: [/.*hybrid.*/, /.*mobile.*/],
      use: { ...devices['Desktop Firefox'] },
    },

    // Web Mobile Emulation testing (Playwright native)
    {
      name: 'Mobile Chrome',
      testIgnore: [/.*hybrid.*/, /.*mobile.*/],
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      testIgnore: [/.*hybrid.*/, /.*mobile.*/],
      use: { ...devices['iPhone 12'] },
    },

    // Mobilewright native mobile and hybrid testing project
    {
      name: 'MobileNative',
      testMatch: [/.*hybrid.*/, /.*mobile.*/],
      use: {
        platform: envConfig.mobile.platformName.toLowerCase() as 'ios' | 'android',
        deviceName: envConfig.mobile.deviceName,
        installApps: [envConfig.mobile.appPath],
      } as any,
    }
  ],
});
