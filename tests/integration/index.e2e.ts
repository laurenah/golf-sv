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

test('clicking a card flips it over', async ({ page }) => {
    await page.goto('/');
    await page.locator('button').click();
    const firstCard = page.locator('.card').first();
    await firstCard.click();

    await expect(firstCard.locator('.front')).toBeVisible();
});

// test plan

/**
 * - cannot flip a card that is already flipped
 * - asserting existence of deck and top card
 * - cannot flip another player's card (this should break the 
 * clicking a card flips it over test, that is player 0 flipping player 1's card)
 * - moving towards once player 0 card flipped, player 1 flips a card
 */
