import { Reporter, TestCase, TestResult, FullResult, TestStep } from '@playwright/test/reporter';
import { Logger } from '../../utils/logger.util.js';

/**
 * Enterprise Custom Reporter.
 * Listens to Playwright test lifecycle events to log execution steps cleanly
 * and prepare Slack/Teams webhooks integration.
 */
class CustomReporter implements Reporter {
  onBegin(config: any, suite: any) {
    Logger.info(`Starting suite execution: ${suite.allTests().length} tests detected.`, 'CustomReporter');
  }

  onTestBegin(test: TestCase) {
    Logger.info(`Test Started: "${test.title}" [Project: ${test.parent.project()?.name}]`, 'CustomReporter');
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === 'test.step') {
      Logger.info(`  Step Executing: "${step.title}"`, 'CustomReporter');
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const duration = (result.duration / 1000).toFixed(2);
    if (result.status === 'passed') {
      Logger.info(`Test Passed: "${test.title}" (${duration}s)`, 'CustomReporter');
    } else if (result.status === 'failed') {
      Logger.error(`Test Failed: "${test.title}" (${duration}s) | Error: ${result.error?.message}`, undefined, 'CustomReporter');
      
      // Slack/Teams alert webhook placeholder:
      // this.sendSlackNotification(test, result);
    } else {
      Logger.warn(`Test End: "${test.title}" with status "${result.status}" (${duration}s)`, 'CustomReporter');
    }
  }

  onEnd(result: FullResult) {
    Logger.info(`Suite execution finished. Status: ${result.status.toUpperCase()}`, 'CustomReporter');
  }

  /**
   * Helper function to send notification alert to team channels.
   */
  private sendSlackNotification(test: TestCase, result: TestResult) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;
    
    // Construct message payload and POST to webhookUrl
    Logger.info(`Slack alert triggered for failed test: "${test.title}"`, 'CustomReporter');
  }
}

export default CustomReporter;
export { CustomReporter };
