import { CardSchema, type Deck } from '$lib/types';
import { SUITS, VALUES } from '../lib/const';

export const build = (): Deck => {
	const cards = SUITS.flatMap((suit) => VALUES.map((value) => CardSchema.parse({ suit, value })));
	shuffle({ cards });
	return { cards };
};

export const shuffle = (deck: Deck): void => {
	deck.cards.sort(() => Math.random() - 0.5);
};
