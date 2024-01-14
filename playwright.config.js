import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  retries: 1,
  timeout: 3 * 60 * 1000,
  // Run all tests in parallel.
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  // retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    retryOnFail: true,
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
  ],
});
