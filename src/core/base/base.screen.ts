/**
 * Base Screen class for Mobile Screen Object Models (POM) under Mobilewright.
 * Encapsulates mobile gestures (swipes, taps), alerts, and element waits.
 */
export class BaseScreen {
  protected screen: any; // Mobilewright screen or page instance

  constructor(screen: any) {
    this.screen = screen;
  }

  /**
   * Safe tap wrapper that logs actions.
   */
  async tapElement(locator: any, elementNameForLog = 'Button'): Promise<void> {
    console.log(`[Mobile Action] Tapping on mobile element "${elementNameForLog}"`);
    await locator.tap();
  }

  /**
   * Safe type/fill helper on mobile inputs with logging.
   */
  async fillInput(locator: any, value: string, fieldNameForLog = 'Input'): Promise<void> {
    console.log(`[Mobile Action] Typing text into mobile input "${fieldNameForLog}": "${value}"`);
    await locator.fill(value);
  }

  /**
   * Mobile-specific helper: swipe down to refresh or scroll.
   */
  async swipeDown(): Promise<void> {
    console.log(`[Mobile Action] Swiping down on screen`);
    // Placeholder for mobile gesture implementation under Mobilewright/Appium
  }

  /**
   * Wait for mobile element to be visible.
   */
  async waitForVisible(locator: any, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
