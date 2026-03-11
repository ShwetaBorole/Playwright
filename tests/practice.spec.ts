import { test, expect } from '@playwright/test';

test.describe('Playwright Advanced Locators and Assertions', () => {

  /* Test timeout, default is 30 seconds. */
  // timeout: 30000,

  /* Run all tests in parallel. */
  // fullyParallel: true,

test('verify task management flow', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Learn Playwright Locators');
  await todoInput.press('Enter');

  const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(1);

    // 5. ASSERTION: toHaveText (Exact match)
    await expect(todoItems).toHaveText('Learn Playwright Locators');

    await page.getByLabel('Toggle Todo').check();
    await expect(todoItems).toHaveClass(/completed/);
});

test('should have the correct title on mobile', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

});