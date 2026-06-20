import { test as mobileTest } from '@mobilewright/test';
import { chromium, Page, expect } from '@playwright/test';
import { LoginPage } from '@pages/system-a/login.page.js';
import { LoginScreen } from '@screens/system-a/login.screen.js';
import { UserApiService } from '@core/api/api.client.js';
import { DbClient } from '@core/database/db.client.js';

// Interface grouping all Web Page Objects
export interface WebAppPOMs {
  loginPage: LoginPage;
}

// Interface grouping all Mobile Screen Objects
export interface MobileAppScreens {
  loginScreen: LoginScreen;
}

// Extend `@mobilewright/test` runner to support Web, API, and DB testing
export const test = mobileTest.extend<{
  webPage: Page;
  webApp: WebAppPOMs;
  mobileApp: MobileAppScreens;
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

  // Mobile Screens POM Fixture (uses mobilewright's native `screen` fixture)
  mobileApp: async ({ screen }, use) => {
    const screens: MobileAppScreens = {
      loginScreen: new LoginScreen(screen)
    };
    await use(screens);
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
