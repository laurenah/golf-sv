import { PLAYER_HUMAN } from '$lib/const';
import { PlayerSchema, type Game } from '$lib/types';
import { build } from './Deck';
import { gameStore } from './stores/gameStore';

export const setupGame = (numComputers: number = 1): Game => {
  if (numComputers > 3) {
    throw new Error('Cannot have more than 3 computer players');
  }

  if (!Number.isInteger(numComputers)) {
    throw new Error('Number of computer players must be an integer between 1 and 3');
  }

  const deck = build();

  const computerPlayers = Array.from({ length: numComputers < 1 ? 1 : numComputers }, () =>
    PlayerSchema.parse({})
  );

  return {
    deck: deck,
    players: [PlayerSchema.parse({ type: PLAYER_HUMAN }), ...computerPlayers],
    currentPlayer: 0,
    topCard: deck.cards[0]
  };
};

export const dealHands = (): void => {
  gameStore.update((game) => {
    const modifiedGame = { ...game, deck: { ...game.deck, cards: [...game.deck.cards] } };

    modifiedGame.players = modifiedGame.players.map((player) => {
      const hand = modifiedGame.deck.cards.splice(0, 4);
      return { ...player, hand };
    });

    modifiedGame.topCard = modifiedGame.deck.cards[0];

    return modifiedGame;
  });
};
