import { PLAYER_HUMAN } from '$lib/const';
import { PlayerSchema, type Game, type Player } from '$lib/types';
import { build } from './Deck';

export const setup = (numComputers: number): Game => {
	const deck = build();

	const computerPlayers = Array.from(
		{ length: numComputers },
		(_, i): Player => PlayerSchema.parse({})
	);

	return {
		deck: deck,
		players: [PlayerSchema.parse({ type: PLAYER_HUMAN }), ...computerPlayers],
		currentPlayer: 0,
		topCard: deck.cards[0]
	};
};
