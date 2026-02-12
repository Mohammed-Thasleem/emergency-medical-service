import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Select a role to access the app
    await page.getByRole('button', { name: /Organizer/i }).click();
    await page.waitForTimeout(500);
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Initially should be in light mode
    const html = page.locator('html');
    
    // Click theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Toggle to dark mode
    await themeToggle.click();
    await page.waitForTimeout(200);
    
    // Check if dark class is added
    const htmlClasses = await html.getAttribute('class');
    expect(htmlClasses).toContain('dark');

    // Toggle back to light mode
    await themeToggle.click();
    await page.waitForTimeout(200);
    
    // Check if dark class is removed
    const htmlClassesAfter = await html.getAttribute('class');
    expect(htmlClassesAfter || '').not.toContain('dark');
  });

  test('should persist theme preference', async ({ page, context }) => {
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    
    // Toggle to dark mode
    await themeToggle.click();
    await page.waitForTimeout(200);

    // Reload the page
    await page.reload();
    await page.waitForTimeout(500);

    // Should still be in dark mode
    const html = page.locator('html');
    const htmlClasses = await html.getAttribute('class');
    expect(htmlClasses).toContain('dark');
  });
});
