import { test, expect } from '@fixtures/base.fixture.js';
import { config } from '@config/env.config.js';

test.describe('System A - Login Feature', () => {

  test('Verify web login with environment credentials and DB status check', async ({ webApp, dbClient }) => {
    // 1. Load credentials dynamically from the config loaded based on CLI target
    const adminUser = config.web.users.admin;

    // 2. Perform Web POM actions
    await webApp.loginPage.navigate();
    await webApp.loginPage.login(adminUser.username, adminUser.password);

    // 3. Perform database validation to verify user account status
    const dbUser = await dbClient.getUser(adminUser.username);
    
    // Assert status using standard Playwright assertions
    expect(dbUser).not.toBeNull();
    expect(dbUser?.status).toBe('ACTIVE');
    expect(dbUser?.email).toBe(`${adminUser.username}@example.com`);
  });

  test('Verify UI validation on login error', async ({ webApp }) => {
    await webApp.loginPage.navigate();
    // Login with invalid credentials
    await webApp.loginPage.login('invalid_user', 'wrong_password');

    // Get UI error message.
    // (In our POM it resolves text content, we can assert on it)
    const errorMsg = await webApp.loginPage.getErrorMessage();
    console.log(`[Validation] Received UI error: "${errorMsg}"`);
  });
});
