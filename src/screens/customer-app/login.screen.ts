import { BaseScreen } from '@core/base/base.screen.js';

/**
 * Screen Object representing the Customer Mobile App Login Screen.
 */
export class CustomerLoginScreen extends BaseScreen {
  readonly emailInput: any;
  readonly passwordInput: any;
  readonly loginButton: any;

  constructor(screen: any) {
    super(screen);
    this.emailInput = this.screen.getByLabel('Customer Email');
    this.passwordInput = this.screen.getByLabel('Customer Password');
    this.loginButton = this.screen.getByRole('button', { name: 'Customer Log In' });
  }

  async login(email: string, pass: string): Promise<void> {
    await this.fillInput(this.emailInput, email, 'Customer Email');
    await this.fillInput(this.passwordInput, pass, 'Customer Password');
    await this.tapElement(this.loginButton, 'Customer Login Button');
  }
}
