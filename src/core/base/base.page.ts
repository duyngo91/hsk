import { Page, Locator } from '@playwright/test';

/**
 * Base Page class for Web Page Object Models (POM).
 * Encapsulates common actions, waits, logging, and helpers.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Safe navigate wrapper that logs actions.
   */
  async navigateTo(url: string): Promise<void> {
    console.log(`[Web Navigation] Navigating to: ${url}`);
    await this.page.goto(url);
  }

  /**
   * Safe fill helper with logging.
   */
  async fillInput(locator: Locator | string, value: string, fieldNameForLog = 'Field'): Promise<void> {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    console.log(`[Web Action] Entering text into "${fieldNameForLog}": "${value}"`);
    await loc.fill(value);
  }

  /**
   * Safe click helper with logging.
   */
  async clickElement(locator: Locator | string, elementNameForLog = 'Element'): Promise<void> {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    console.log(`[Web Action] Clicking on "${elementNameForLog}"`);
    await loc.click();
  }

  /**
   * Wait for elements to be visible.
   */
  async waitForVisible(locator: Locator | string, timeout = 5000): Promise<void> {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await loc.waitFor({ state: 'visible', timeout });
  }
}
