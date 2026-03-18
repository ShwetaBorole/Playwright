import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './utils/environmentBaseUrl';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 2,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 100 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  //reporter: [['html', { open: 'always' }]], //always, never and on-failure (default)
  //reporter: [['html', { outputFolder: 'my-report' }]], // report is written into the playwright-report folder in the current working directory. override it using the PLAYWRIGHT_HTML_REPORT
  // reporter: 'dot',
  // reporter: 'list',
  
  reporter: [
    ['list'],                                     // See progress in terminal
    ['html', { open: 'on-failure' }],             // Only pop open the browser if something breaks
    ['json', { outputFile: 'test-results.json' }] // Save data for later analysis
  ],
  /**
   * custom reports: https://playwright.dev/docs/test-reporters#custom-reporters 
  */
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // off, on, 'retain-on-failure' and on-first-retry'
    trace: 'off',
    screenshot: 'only-on-failure',
    // headless: false,
    // ignoreHTTPSErrors: true,
    // viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
  },
    // timeout: 30000, //https://playwright.dev/docs/test-timeouts
    // expect: {
      /**
       * Maximum time expect() should wait for the condition to be met.
       * For example in `await expect(locator).toHaveText();`
       */
      // timeout: 10000,
    // },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'Embedded-device',
      use: { 
        ...devices['Tablet'], // This sets the screen size and user agent
        browserName: 'chromium', // Override the browser to use Chrome's rendering engine
        viewport: { width: 390, height: 844 },
        ignoreHTTPSErrors: true, // Useful for testing dev environments
        screenshot: 'on',       // Always take a screenshot for mobile runs
        video: 'on',            // Always record video for mobile runs
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'chromium',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Chrome']
      },
    },

    {
      name: 'safari',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Safari']
      },
    },

    {
      name: 'firefox',
      use: { 
        baseURL: 'https://playwright.dev/',
         ...devices['Desktop Firefox']
      },
    },

    // Example only
    {
      name: 'local',
      use: { 
        baseURL: baseEnvUrl.local.home,
      },
    },

    // Example only
    {
      name: 'ci',
      use: { 
         baseURL: process.env.CI
          ? baseEnvUrl.ci.prefix + process.env.GITHUB_REF_NAME + baseEnvUrl.ci.suffix //https://dev-myapp-chapter-2.mydomain.com
          : baseEnvUrl.staging.home,
      },
      /**
       * GitHub variables: https://docs.github.com/en/actions/learn-github-actions/variables
       * GitLab variables: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html#predefined-variables-reference
       */
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
