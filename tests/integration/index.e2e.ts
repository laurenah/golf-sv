import { test, expect } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.locator('h1')).toHaveText('Golf');
});

test('home page renders a new game button', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('button')).toHaveCount(1);
});

test('clicking new game button renders 2 groups of 4 cards', async ({ page }) => {
	await page.goto('/');
	await page.locator('button').click();
	await expect(page.locator('.card')).toHaveCount(8);
});
