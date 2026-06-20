import { test as mobileTest } from '@mobilewright/test';
import { chromium, Page, expect } from '@playwright/test';
import { LoginPage } from '@pages/system-a/login.page.js';
import { CustomerLoginScreen } from '@screens/customer-app/login.screen.js';
import { DriverLoginScreen } from '@screens/driver-app/login.screen.js';
import { MerchantDashboardScreen } from '@screens/merchant-app/dashboard.screen.js';
import { UserApiService } from '@core/api/api.client.js';
import { DbClient } from '@core/database/db.client.js';
import { config } from '@config/env.config.js';

// Interface grouping all Web Page Objects
export interface WebAppPOMs {
  loginPage: LoginPage;
}

// Interface grouping all Customer App Screens
export interface CustomerAppPOM {
  loginScreen: CustomerLoginScreen;
}

// Interface grouping all Driver App Screens
export interface DriverAppPOM {
  loginScreen: DriverLoginScreen;
}

// Interface grouping all Merchant App Screens
export interface MerchantAppPOM {
  dashboardScreen: MerchantDashboardScreen;
}

// Extend `@mobilewright/test` runner to support Web, API, DB and Multi-App testing
export const test = mobileTest.extend<{
  webPage: Page;
  webApp: WebAppPOMs;
  customerApp: CustomerAppPOM;
  driverApp: DriverAppPOM;
  merchantApp: MerchantAppPOM;
  apiClient: UserApiService;
  dbClient: DbClient;
}>({
  // Web Browser Fixture (launched dynamically alongside mobile session)
  webPage: async ({}, use) => {
    console.log('[Fixture] Launching Web Browser Context...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await use(page);

    console.log('[Fixture] Closing Web Browser Context...');
    await page.close();
    await context.close();
    await browser.close();
  },

  // Web Pages POM Fixture (uses webPage)
  webApp: async ({ webPage }, use) => {
    const poms: WebAppPOMs = {
      loginPage: new LoginPage(webPage)
    };
    await use(poms);
  },

  // Customer Mobile App Fixture (uses mobilewright's native `device` and `screen` fixtures)
  customerApp: async ({ device, screen }, use) => {
    console.log('[Fixture] Launching Customer App...');
    const appConfig = config.mobile.apps.customerApp;
    // Launch the specific application package
    await device.launchApp(appConfig.appPackage, { activity: appConfig.appActivity });

    const poms: CustomerAppPOM = {
      loginScreen: new CustomerLoginScreen(screen)
    };

    await use(poms);

    // Clean up: stop the application package
    await device.terminateApp(appConfig.appPackage);
  },

  // Driver Mobile App Fixture (uses mobilewright's native `device` and `screen` fixtures)
  driverApp: async ({ device, screen }, use) => {
    console.log('[Fixture] Launching Driver App...');
    const appConfig = config.mobile.apps.driverApp;
    // Launch the specific application package
    await device.launchApp(appConfig.appPackage, { activity: appConfig.appActivity });

    const poms: DriverAppPOM = {
      loginScreen: new DriverLoginScreen(screen)
    };

    await use(poms);

    // Clean up: stop the application package
    await device.terminateApp(appConfig.appPackage);
  },

  // Merchant Mobile App Fixture (uses mobilewright's native `device` and `screen` fixtures)
  merchantApp: async ({ device, screen }, use) => {
    console.log('[Fixture] Launching Merchant App...');
    const appConfig = config.mobile.apps.merchantApp;
    // Launch the specific application package
    await device.launchApp(appConfig.appPackage, { activity: appConfig.appActivity });

    const poms: MerchantAppPOM = {
      dashboardScreen: new MerchantDashboardScreen(screen)
    };

    await use(poms);

    // Clean up: stop the application package
    await device.terminateApp(appConfig.appPackage);
  },

  // API Client Fixture
  apiClient: async ({ request }, use) => {
    const api = new UserApiService(request as any);
    await use(api);
  },

  // Database Client Fixture
  dbClient: async ({}, use) => {
    const db = new DbClient();
    await db.connect();
    await use(db);
    await db.disconnect();
  }
});

export { expect };
export type TestType = typeof test;
export type ExpectType = typeof expect;
export type PageType = Page;
