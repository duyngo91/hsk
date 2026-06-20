import { Page, Locator } from '@playwright/test';
import { BasePage } from '@core/base/base.page.js';
import { config } from '@config/env.config.js';

/**
 * Page Object representing the Login Page of System A.
 * Utilized by automated test cases and AI generation engines.
 */
export class LoginPage extends BasePage {
  // Elements
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.locator('#username');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#btn-submit');
    this.errorMessage = this.page.locator('.alert-danger');
  }

  /**
   * Navigates to the base login page based on environment configuration.
   */
  async navigate(): Promise<void> {
    await this.navigateTo(`${config.web.baseUrl}/login`);
  }

  /**
   * Log into System A with provided credentials.
   * @param username The account username string.
   * @param password The account password string.
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username, 'Username Input');
    await this.fillInput(this.passwordInput, password, 'Password Input');
    await this.clickElement(this.loginButton, 'Submit Login Button');
  }

  /**
   * Fetches the visible error message text on the screen, if any.
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessage);
    const errorText = await this.errorMessage.textContent();
    return errorText?.trim() || '';
  }
}
