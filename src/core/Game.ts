import { GAME_STATES, PLAYER_COMPUTER, PLAYER_HUMAN } from '$lib/const';
import { PlayerSchema, type Card, type Game, type Player } from '$lib/types';
import { build } from './Deck';
import { gameStore } from './stores/gameStore';
import { v4 as uuidv4 } from 'uuid';

export const setupGame = (numComputers: number = 1): Game => {
  if (numComputers > 3) {
    throw new Error('Cannot have more than 3 computer players');
  }

  if (!Number.isInteger(numComputers)) {
    throw new Error('Number of computer players must be an integer between 1 and 3');
  }

  const deck = build();

  const computerPlayers = Array.from({ length: numComputers < 1 ? 1 : numComputers }, () =>
    PlayerSchema.parse({
      id: uuidv4(),
      type: PLAYER_COMPUTER
    })
  );

  return {
    deck: deck,
    players: [...computerPlayers, PlayerSchema.parse({ id: uuidv4(), type: PLAYER_HUMAN })],
    topCard: deck.cards[0],
    state: GAME_STATES.PEEKING
  };
};

export const dealHands = (): void => {
  gameStore.update((game) => {
    const modifiedGame = { ...game, deck: { ...game.deck, cards: [...game.deck.cards] } };

    modifiedGame.players = modifiedGame.players.map((player) => {
      const hand = modifiedGame.deck.cards.splice(0, 4);

      // Auto-peek cards for computer players
      if (player.type === PLAYER_COMPUTER) {
        hand[0].known = true;
        hand[1].known = true;
      }

      return { ...player, hand };
    });

    modifiedGame.topCard = modifiedGame.deck.cards[0];

    return modifiedGame;
  });
};

export const peekCards = (player: Player, cards: Card[]): void => {
  gameStore.update((game) => {
    const modifiedGame = { ...game, players: [...game.players] };

    const playerIndex = modifiedGame.players.findIndex((p) => p.id === player.id);
    const playerToUpdate = modifiedGame.players[playerIndex];
    const updatedPlayer = { ...playerToUpdate, hand: [...playerToUpdate.hand] };

    cards.forEach((card) => {
      const cardIndex = updatedPlayer.hand.findIndex((c) => c.suit === card.suit && c.value === card.value);
      updatedPlayer.hand[cardIndex].known = true;
    });

    modifiedGame.players[playerIndex] = updatedPlayer;
    modifiedGame.state = GAME_STATES.PLAYING;

    return modifiedGame;
  });
};
