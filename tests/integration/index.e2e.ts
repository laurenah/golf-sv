/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Override `setTimeout` globally in the browser context
  await page.addInitScript(() => {
    const mockSetTimeout = (handler: TimerHandler, timeout?: number, ...args: any[]) => {
      if (typeof handler === 'function') {
        handler(...args);
      }
      return 0;
    };

    (mockSetTimeout as any).__promisify__ = () => Promise.resolve();
    window.setTimeout = mockSetTimeout as typeof setTimeout;
  });
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
  const playerGrid = page.locator('.grid').last();
  const firstPlayerCard = playerGrid.locator('.card').first();
  await firstPlayerCard.click();

  await expect(firstPlayerCard.locator('.front')).toBeVisible();
});

// test plan

/**
 * ## CARD
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
  const playerGrid = page.locator('.grid').last();
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
  const opponentGrid = page.locator('.grid').first();

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

test('deck and topcard indicate when player needs to pick up', async ({ page }) => {
  await page.goto('/');
  await page.locator('button').click();
  const playerGrid = page.locator('.grid').last();
  const firstPlayerCard = playerGrid.locator('.card').first();
  const secondPlayerCard = playerGrid.locator('.card').nth(1);
  // Peek the cards
  await firstPlayerCard.click();
  await secondPlayerCard.click();

  await expect(page.locator('.deck')).toHaveClass(/glow/);
  await expect(page.locator('.topcard')).toHaveClass(/glow/);
});
