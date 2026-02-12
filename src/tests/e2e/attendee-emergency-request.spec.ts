import { test, expect } from '@playwright/test';

test.describe('Attendee Emergency Request Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow role selection and navigate to attendee view', async ({ page }) => {
    // Wait for role selector to load
    await expect(page.getByText('Emergency Medical Services')).toBeVisible();

    // Click on Attendee role
    await page.getByRole('button', { name: /Attendee/i }).click();

    // Should navigate to attendee dashboard
    await expect(page.getByText(/Request Emergency Help/i)).toBeVisible();
  });

  test('should create an emergency request', async ({ page }) => {
    // Select attendee role
    await page.getByRole('button', { name: /Attendee/i }).click();

    // Click emergency request button
    await page.getByText(/Request Emergency Help/i).click();

    // Should show the form
    await expect(page.getByText(/Request Emergency Assistance/i)).toBeVisible();

    // Mock geolocation
    await page.context().grantPermissions(['geolocation']);
    await page.context().setGeolocation({ latitude: 40.7589, longitude: -73.9851 });

    // Capture location
    await page.getByText(/Capture My Location/i).click();

    // Wait for location to be captured
    await expect(page.getByText(/Location captured/i)).toBeVisible({ timeout: 5000 });

    // Fill out the form
    await page.selectOption('select#category', 'Cardiac');
    await page.click('button:has-text("High")');
    await page.fill('textarea#description', 'Test emergency description');

    // Submit the form
    await page.click('button:has-text("Request Emergency Assistance")');

    // Should show success message and return to dashboard
    await expect(page.getByText(/Emergency request submitted/i)).toBeVisible({ timeout: 5000 });
  });

  test('should display emergency history', async ({ page }) => {
    // Select attendee role
    await page.getByRole('button', { name: /Attendee/i }).click();

    // Should show emergency history section
    await expect(page.getByText(/Your Emergency History/i)).toBeVisible();
  });
});
