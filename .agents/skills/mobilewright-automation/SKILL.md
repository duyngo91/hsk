---
name: mobilewright-automation
description: Guidelines and code syntax for generating Native Mobile tests and hybrid Web+Mobile tests using Mobilewright and Playwright. Includes MCP integration guidelines.
---

# Mobilewright Automation Guide for AI Agents

This skill provides the syntax, rules, and examples for generating native mobile automation tests and cross-platform (Web + Mobile) end-to-end integration tests using **Mobilewright** and **Playwright**.

---

## 1. Core Principles & Philosophy

*   **No Sleeps or Static Waits**: Mobilewright features built-in auto-waiting. Never generate `sleep()` or custom delay calls.
*   **Accessibility Tree Locators**: Mobilewright interacts with the native app's accessibility tree. Do NOT use screen coordinates, visual patterns, or xpath. Use:
    *   `screen.getByLabel('LabelName')`
    *   `screen.getByRole('button', { name: 'ButtonText' })`
    *   `screen.getByText('StaticText')`
*   **Unified Runner**: Under the hood, Mobilewright extends Playwright's runner. Therefore, `@mobilewright/test` behaves exactly like `@playwright/test`.

---

## 2. API Signature & Syntax Reference

### Mobile Actions
*   **Tap**: `await element.tap()`
*   **Type/Fill**: `await element.fill('text')`
*   **Press Back**: `await device.press('Back')` (Android-specific)
*   **Wait for State**: `await element.waitFor({ state: 'visible', timeout: 5000 })`

### Assertions (Auto-waiting)
*   Verify Visibility: `await expect(element).toBeVisible()`
*   Verify Element Content: `await expect(element).toContainText('Expected Text')`
*   Verify Input Value: `await expect(element).toHaveValue('Value')`

---

## 3. Dependency Injection Fixtures
All page objects and helpers are injected via [base.fixture.ts](file:///e:/Project/auto/playwright/src/fixtures/base.fixture.ts). When writing tests, destructure the following variables in the test parameters:

*   `webPage`: The browser Page context (for Web actions)
*   `webApp`: Object containing all Web Page Objects (e.g., `loginPage`)
*   `mobileApp`: Object containing all Mobile Screen Objects (e.g., `loginScreen` wrapping the native Mobilewright `screen`)
*   `screen`: Raw Mobilewright screen context
*   `device`: Raw Mobilewright device context
*   `apiClient`: Reusable REST API Client
*   `dbClient`: Database Connection Helper

---

## 4. Test Templates & Code Examples

### Example A: Native Mobile-Only Test
```typescript
import { test, expect } from '@fixtures/base.fixture.js';

test.describe('Mobile Authentication', () => {
  test('User can log in successfully on App', async ({ mobileApp }) => {
    // 1. Interact with the Mobile POM
    await mobileApp.loginScreen.login('john_doe', 'secure_pass_123');

    // 2. Validate state after login
    // (Inside loginScreen, elements are located using screen.getByLabel or getByRole)
    // Here we can check screen elements
  });
});
```

### Example B: Hybrid Web + Mobile Test (Single Test Case)
Use this pattern when a workflow crosses boundaries (e.g., triggering a push notification from the web panel, or activating a mobile account from the admin console).
```typescript
import { test, expect } from '@fixtures/base.fixture.js';
import { config } from '@config/env.config.js';

test('E2E Account Creation & Mobile Login', async ({ webApp, mobileApp, dbClient }) => {
  const newUser = config.web.users.standard;

  // Step 1: Create user on the Web Portal
  await webApp.loginPage.navigate();
  await webApp.loginPage.login(newUser.username, newUser.password);
  
  // Step 2: Query DB to check status
  const dbUser = await dbClient.getUser(newUser.username);
  expect(dbUser?.status).toBe('ACTIVE');

  // Step 3: Perform authentication check on Mobile application
  await mobileApp.loginScreen.login(newUser.username, newUser.password);
});
```

---

## 5. Integrating with MCP (Model Context Protocol)

When an AI Agent is executing, generating, or debugging tests in this framework, it can utilize local or cloud MCP Servers to control the browser or mobile device in real-time:

### A. Playwright Web MCP
AI agents can invoke `playwright` MCP tools (e.g., `browser_navigate`, `browser_click`, `browser_type`, `browser_snapshot`) to:
1. Spin up a live browser window to inspect elements and fetch exact selector IDs.
2. Interactively run through login and checkout flows to verify elements before generating POM files.

### B. Mobilewright / Mobile MCP
AI agents can invoke `mobile-mcp` (or custom Appium-based mobile MCP servers) to:
1. Retrieve the active mobile screen's **accessibility tree** in JSON format to locate elements.
2. Dispatch native touch/swipe/input events to verify application state.
3. Automatically diagnose test failures by fetching live simulator screenshots and inspecting the app hierarchy.
