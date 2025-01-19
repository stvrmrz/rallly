const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './playwright-tests', // Playwright tests directory
  use: {
    browserName: 'chromium', // Default browser
    baseURL: 'http://localhost:3000', // Base URL for tests
    headless: true, // Always run in headed mode
    screenshot: 'only-on-failure', // Take a screenshot on test failure
    video: 'retain-on-failure', // Record video for all failed test runs
    trace: 'retain-on-failure', // Capture trace on failure for debugging
  },
  testIgnore: ['**/*.jest.test.ts', '**/__tests__/**'], // Ignore Jest tests
  reporter: 'list', // Show logs in the terminal during test execution
});
