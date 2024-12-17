import { describe, it, expect, beforeEach } from 'vitest';
import { dealHands, peekCards, setupGame } from '../../src/core/Game';
import type { Game, Player } from '../../src/lib/types';
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

  it('should have currentPlayer be undefined to indicate game has not started', async () => {
    const game = get(gameStore);

    expect(game.currentPlayer).toBeUndefined();
  });
});

describe('dealHands', () => {
  let game: Game;
  let unsubscribe: () => void;

  beforeEach(() => {
    game = setupGame();
    gameStore.set(game);
    unsubscribe = gameStore.subscribe((state) => (game = state));
  });

  it('should deal 4 cards to each player using the store', async () => {
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

  it('should set 2 of computer player cards to known', async () => {
    dealHands();

    const player = getComputerPlayer(game);

    expect(player.hand).toHaveLength(4);
    expect(player.hand[0].known).toBe(true);
    expect(player.hand[1].known).toBe(true);
    expect(player.hand[2].known).toBe(false);
    expect(player.hand[3].known).toBe(false);

    unsubscribe();
  });
});

describe('peekCards', () => {
  let game: Game;
  let unsubscribe: () => void;

  beforeEach(() => {
    game = setupGame();
    gameStore.set(game);
    unsubscribe = gameStore.subscribe((state) => (game = state));
  });

  it('should set the first two cards of the hand to known', async () => {
    dealHands();

    const player = getHumanPlayer(game);

    expect(player.hand[0].known).toBe(false);
    expect(player.hand[1].known).toBe(false);
    expect(player.hand[2].known).toBe(false);
    expect(player.hand[3].known).toBe(false);

    peekCards(player, [player.hand[0], player.hand[1]]);

    expect(player.hand[0].known).toBe(true);
    expect(player.hand[1].known).toBe(true);
    expect(player.hand[2].known).toBe(false);
    expect(player.hand[3].known).toBe(false);

    unsubscribe();
  });
});

const getHumanPlayer = (game: Game): Player =>
  game.players.find((player) => player.type === 'human') ?? game.players[1];
const getComputerPlayer = (game: Game): Player =>
  game.players.find((player) => player.type === 'computer') ?? game.players[0];
