import { test, expect } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.locator('h1')).toHaveText('Golf');
});

test('home page renders four cards', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.card')).toHaveCount(4);
});
