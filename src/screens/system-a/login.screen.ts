import { BaseScreen } from '@core/base/base.screen.js';

/**
 * Screen Object representing the Mobile Login Screen of System A.
 * Uses Mobilewright accessibility-tree locators (Playwright API parity).
 */
export class LoginScreen extends BaseScreen {
  // Define mobile element locators
  readonly usernameField: any;
  readonly passwordField: any;
  readonly submitButton: any;
  readonly errorMessageText: any;

  constructor(screen: any) {
    super(screen);
    // Locate elements using Mobilewright's semantic, accessibility-based locators
    this.usernameField = this.screen.getByLabel('Username');
    this.passwordField = this.screen.getByLabel('Password');
    this.submitButton = this.screen.getByRole('button', { name: 'Log In' });
    this.errorMessageText = this.screen.getByRole('text', { name: 'Error message' });
  }

  /**
   * Performs a mobile login action.
   * @param username User credentials username.
   * @param password User credentials password.
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameField, username, 'Mobile Username Field');
    await this.fillInput(this.passwordField, password, 'Mobile Password Field');
    await this.tapElement(this.submitButton, 'Mobile Submit Button');
  }

  /**
   * Retrieves text contents of error warning in the login view.
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForVisible(this.errorMessageText);
    const errorMsg = await this.errorMessageText.textContent();
    return errorMsg?.trim() || '';
  }
}
