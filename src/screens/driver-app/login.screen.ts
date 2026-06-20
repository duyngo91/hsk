import { BaseScreen } from '@core/base/base.screen.js';

/**
 * Screen Object representing the Driver Mobile App Login Screen.
 */
export class DriverLoginScreen extends BaseScreen {
  readonly licenseInput: any;
  readonly passwordInput: any;
  readonly submitButton: any;

  constructor(screen: any) {
    super(screen);
    this.licenseInput = this.screen.getByLabel('Driver License Number');
    this.passwordInput = this.screen.getByLabel('Driver Password');
    this.submitButton = this.screen.getByRole('button', { name: 'Driver Sign In' });
  }

  async login(license: string, pass: string): Promise<void> {
    await this.fillInput(this.licenseInput, license, 'Driver License');
    await this.fillInput(this.passwordInput, pass, 'Driver Password');
    await this.tapElement(this.submitButton, 'Driver Submit Button');
  }
}
