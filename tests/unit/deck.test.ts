import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { build, shuffle } from '../../src/core/Deck';
import { SUITS, VALUES } from '../../src/lib/const';
import type { Deck } from '$lib/types';

describe('build', () => {
	let deck: Deck;

	beforeAll(() => {
		deck = build();
	});

	it('creates an array of 52 cards', async () => {
		expect(deck.cards).toHaveLength(52);
	});

	it('creates an array of 13 cards for each suit', async () => {
		for (const suit of SUITS) {
			const suitCards = deck.cards.filter(card => card.suit === suit);
			expect(suitCards).toHaveLength(13);
		}
	});

	it('creates an array of 4 cards for each value', async () => {
		for (const value of VALUES) {
			const valueCards = deck.cards.filter(card => card.value === value);
			expect(valueCards).toHaveLength(4);
		}
	});
});

describe('shuffle', () => {
	let deck: Deck;
	let originalDeck: Deck;

	beforeEach(() => {
		deck = build();
		originalDeck = { ...deck };
	});

	it('rearranges the deck', async () => {
		shuffle(deck);
		expect(deck.cards).not.toEqual(originalDeck);
	});

	it('does not add or remove cards', async () => {
		shuffle(deck);
		expect(deck.cards).toHaveLength(52);
		expect(deck.cards).toEqual(expect.arrayContaining(originalDeck.cards));
	});

	it('does not change the number of cards for each suit and each value', async () => {
		shuffle(deck);
		for (const suit of SUITS) {
			const suitCards = deck.cards.filter(card => card.suit === suit);
			const originalSuitCards = originalDeck.cards.filter(card => card.suit === suit);
			expect(suitCards).toHaveLength(originalSuitCards.length);
		}

		for (const value of VALUES) {
			const valueCards = deck.cards.filter(card => card.value === value);
			const originalValueCards = originalDeck.cards.filter(card => card.value === value);
			expect(valueCards).toHaveLength(originalValueCards.length);
		}
	});
});
