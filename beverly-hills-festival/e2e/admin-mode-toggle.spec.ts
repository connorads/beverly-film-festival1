import { test, expect } from '@playwright/test';

test.describe('Admin Mode Toggle @smoke', () => {
  test('admin toggles site mode and public navigation updates', async ({ page }) => {
    // 1. Login as admin
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'admin@beverlyhillsfilmfest.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await page.waitForURL('/admin/dashboard');
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    
    // 2. Check initial mode (pre-festival)
    const modeToggle = page.locator('[data-testid="mode-toggle"]');
    await expect(modeToggle).toContainText('Pre-Festival Mode');
    
    // 3. Navigate to public site and verify pre-festival pages
    await page.goto('/');
    await expect(page.locator('nav')).toContainText('Submit Film');
    await expect(page.locator('nav')).toContainText('Buy Tickets');
    await expect(page.locator('nav')).not.toContainText('Winners');
    await expect(page.locator('nav')).not.toContainText('Gallery');
    
    // 4. Go back to admin and toggle to post-festival
    await page.goto('/admin/dashboard');
    await page.click('[data-testid="mode-toggle-button"]');
    await expect(modeToggle).toContainText('Post-Festival Mode');
    
    // 5. Navigate to public site and verify post-festival pages
    await page.goto('/');
    await expect(page.locator('nav')).not.toContainText('Submit Film');
    await expect(page.locator('nav')).toContainText('Winners');
    await expect(page.locator('nav')).toContainText('Gallery');
    await expect(page.locator('nav')).toContainText('Recap');
  });
});