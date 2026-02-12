import { test, expect } from '@playwright/test';

test.describe('Organizer Dashboard Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard with all key metrics', async ({ page }) => {
    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Should show dashboard title
    await expect(page.getByText(/Event Dashboard/i)).toBeVisible();

    // Should show all stat cards
    await expect(page.getByText(/Total Incidents/i)).toBeVisible();
    await expect(page.getByText(/Active Incidents/i)).toBeVisible();
    await expect(page.getByText(/Resolved/i)).toBeVisible();
    await expect(page.getByText(/Avg Response Time/i)).toBeVisible();
    await expect(page.getByText(/Responders/i)).toBeVisible();
  });

  test('should display emergency map', async ({ page }) => {
    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Should show map component
    await expect(page.getByText(/Event Map/i)).toBeVisible();
    await expect(page.getByText(/Map Integration Ready/i)).toBeVisible();
  });

  test('should display active incidents list', async ({ page }) => {
    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Should show active incidents section
    await expect(page.getByText(/Active Incidents/i)).toBeVisible();
  });

  test('should display responders list with status', async ({ page }) => {
    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Should show medical responders section
    await expect(page.getByText(/Medical Responders/i)).toBeVisible();
  });

  test('should show live updates indicator', async ({ page }) => {
    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Should show live updates indicator
    await expect(page.getByText(/Live updates enabled/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Select organizer role
    await page.getByRole('button', { name: /Organizer/i }).click();

    // Dashboard should still be visible and functional
    await expect(page.getByText(/Event Dashboard/i)).toBeVisible();
    await expect(page.getByText(/Total Incidents/i)).toBeVisible();
  });
});
