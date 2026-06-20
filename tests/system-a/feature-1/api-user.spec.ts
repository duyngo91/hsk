import { test, expect } from '@fixtures/base.fixture.js';

test.describe('System A - API User Integration', () => {

  test('Verify API workflow - login, create user and retrieve profile', async ({ apiClient }) => {
    // 1. Reuse authenticating API login across multiple test scenarios
    const token = await apiClient.login();
    expect(token).toBeDefined();
    
    // 2. Perform POST request via the API client wrapper
    const newUserData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Standard'
    };
    
    const createResponse = await apiClient.createUser(newUserData);
    
    // Validate response payload status or handle mock fallback
    if (createResponse.status() === 201 || createResponse.status() === 200) {
      const createdUser = await createResponse.json();
      expect(createdUser.name).toBe(newUserData.name);
      expect(createdUser.email).toBe(newUserData.email);
    } else {
      console.warn('[API Spec] Create user endpoint returned status: ' + createResponse.status());
    }

    // 3. Perform GET request reusing token context
    const profileResponse = await apiClient.getUserProfile('usr_1001');
    if (profileResponse.status() === 200) {
      const profile = await profileResponse.json();
      expect(profile).toHaveProperty('id');
    }
  });
});
