import { test, expect } from '@playwright/test';

test.describe('Paramedic Response Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow paramedic to view incident queue', async ({ page }) => {
    // Select paramedic role
    await page.getByRole('button', { name: /Paramedic/i }).click();

    // Should show incident queue
    await expect(page.getByText(/Incident Queue/i)).toBeVisible();
    await expect(page.getByText(/Queue Summary/i)).toBeVisible();
  });

  test('should allow paramedic to assign incident to themselves', async ({ page }) => {
    // Select paramedic role
    await page.getByRole('button', { name: /Paramedic/i }).click();

    // Wait for incidents to load
    await page.waitForTimeout(1000);

    // Click on an unassigned incident (if available)
    const unassignedIncident = page.locator('button:has-text("Requested")').first();
    
    if (await unassignedIncident.isVisible()) {
      await unassignedIncident.click();

      // Should show incident details
      await expect(page.getByText(/Incident Details/i)).toBeVisible();

      // Assign to self if button is available
      const assignButton = page.getByRole('button', { name: /Assign to Me/i });
      if (await assignButton.isVisible()) {
        await assignButton.click();
        
        // Should show success message
        await expect(page.getByText(/Incident assigned/i)).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should show incident filters', async ({ page }) => {
    // Select paramedic role
    await page.getByRole('button', { name: /Paramedic/i }).click();

    // Should show filter dropdown
    const filterSelect = page.locator('select').first();
    await expect(filterSelect).toBeVisible();

    // Test different filters
    await filterSelect.selectOption('active');
    await filterSelect.selectOption('assigned');
    await filterSelect.selectOption('all');
  });

  test('should update incident status', async ({ page }) => {
    // Select paramedic role
    await page.getByRole('button', { name: /Paramedic/i }).click();

    // Wait for incidents to load
    await page.waitForTimeout(1000);

    // Click on an assigned incident
    const assignedIncident = page.locator('button:has-text("Assigned")').first();
    
    if (await assignedIncident.isVisible()) {
      await assignedIncident.click();

      // Should show status update buttons
      const onTheWayButton = page.getByRole('button', { name: /Mark as On the Way/i });
      if (await onTheWayButton.isVisible()) {
        await onTheWayButton.click();
        
        // Should show success message
        await expect(page.getByText(/Status updated/i)).toBeVisible({ timeout: 5000 });
      }
    }
  });
});
