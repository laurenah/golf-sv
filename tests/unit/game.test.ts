import { describe, it, expect, beforeEach } from 'vitest';
import { dealHands, setupGame } from '../../src/core/Game';
import type { Game } from '$lib/types';
import { gameStore } from '../../src/core/stores/gameStore';
import { get } from 'svelte/store';

describe('setupGame', () => {
	let game: Game;
	beforeEach(() => {
		game = setupGame();
		gameStore.set(game);
	});

	it('should create a game with 2 players by default', async () => {
		const game = get(gameStore);

		expect(game.players).toHaveLength(2);
	});

	it('should create a game with 3 players', async () => {
		const game = setupGame(2);

		expect(game.players).toHaveLength(3);
	});

	it('should create a game with 2 players when invalid parameter supplied', async () => {
		const game = setupGame(0);

		expect(game.players).toHaveLength(2);
	});

	it('should error when more than 3 players are requested', async () => {
		expect(() => setupGame(4)).toThrow();
	});

	it('should error when non-integer is passed', async () => {
		expect(() => setupGame(1.5)).toThrow();
	});
});

describe('dealHands', () => {
	let game: Game;
	beforeEach(() => {
		game = setupGame();
		gameStore.set(game);
	});

	it('should deal 4 cards to each player using the store', async () => {
		const unsubscribe = gameStore.subscribe((state) => (game = state));

		const initialTopCard = game.topCard;
		expect(game.players).toHaveLength(2);
		expect(game.deck.cards).toHaveLength(52);

		dealHands();

		expect(game.players[0].hand).toHaveLength(4);
		expect(game.players[1].hand).toHaveLength(4);
		expect(game.deck.cards).toHaveLength(44);
		expect(game.topCard).not.toBe(initialTopCard);
		expect(game.topCard).toBe(game.deck.cards[0]);

		unsubscribe();
	});
});
