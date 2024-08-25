import { z } from 'zod';
import { PLAYER_COMPUTER, PLAYER_HUMAN } from './const';

export const CardSchema = z.object({
  suit: z.string(),
  value: z.string(),
  locked: z.boolean().optional().default(false),
  known: z.boolean().optional().default(false)
});

const DeckSchema = z.object({
  cards: z.array(CardSchema)
});

const PlayerType = z.enum([PLAYER_HUMAN, PLAYER_COMPUTER]);

export const PlayerSchema = z.object({
  id: z.string(),
  hand: z.array(CardSchema).default([]),
  type: PlayerType.default(PLAYER_COMPUTER),
  score: z.number().default(0)
});

export const GameSchema = z.object({
  deck: DeckSchema,
  players: z.array(PlayerSchema),
  currentPlayer: z.number().optional(),
  topCard: CardSchema.optional(),
  state: z.string().optional()
});

export type Deck = z.infer<typeof DeckSchema>;

export type Card = z.infer<typeof CardSchema>;

export type Player = z.infer<typeof PlayerSchema>;

export type Game = z.infer<typeof GameSchema>;
