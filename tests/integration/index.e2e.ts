import { test, expect } from '@playwright/test';

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
	const playerGrid = page.locator('.grid').first();
	const firstPlayerCard = playerGrid.locator('.card').first();
	await firstPlayerCard.click();

	await expect(firstPlayerCard.locator('.front')).toBeVisible();
});

// test plan

/**
 * ## CARD
 * - cannot flip another player's card (this should break the
 * clicking a card flips it over test, that is player 0 flipping player 1's card)
 * - moving towards once player 0 card flipped, player 1 flips a card
 * ## SCORE
 * - sidebar to display score
 * - sidebar displays all players
 * - score is displayed when game object is updated to have score
 * ## TURN
 * - note displayed to indicate whose turn it is
 * - turn changes after a card is flipped
 */

test('cannot flip a card that is already flipped', async ({ page }) => {
	await page.goto('/');
	await page.locator('button').click();
	const playerGrid = page.locator('.grid').first();
	const firstPlayerCard = playerGrid.locator('.card').first();
	const transformation = 'matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)';

	// Lock the card
	await firstPlayerCard.click();
	await page.waitForTimeout(600);

	let backElement = await firstPlayerCard.locator('.back').elementHandle();
	if (backElement) {
		const backSideTransform = await page.evaluate(
			(el) => window.getComputedStyle(el).transform,
			backElement
		);
		expect(backSideTransform).toBe(transformation);
	}

	// Try to flip the card again
	await firstPlayerCard.click();
	await page.waitForTimeout(600);

	backElement = await firstPlayerCard.locator('.back').elementHandle();
	if (backElement) {
		const backSideTransformAfterClick = await page.evaluate(
			(el) => window.getComputedStyle(el).transform,
			backElement
		);
		expect(backSideTransformAfterClick).toBe(transformation);
	}
});

test('cannot flip opponent card due to pointer-events being none', async ({ page }) => {
	await page.goto('/');
	await page.locator('button').click();
	const opponentGrid = page.locator('.grid').last();

	const pointerEvents = await opponentGrid.evaluate(
		(el) => window.getComputedStyle(el).pointerEvents
	);
	expect(pointerEvents).toBe('none');
});

test('game displays deck and top card', async ({ page }) => {
	await page.goto('/');
	await page.locator('button').click();
	await expect(page.locator('.deck')).toBeVisible();
	await expect(page.locator('.topcard')).toBeVisible();
});
