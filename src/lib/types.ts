import { z } from "zod";

const CardSchema = z.object({
    suit: z.string(),
    value: z.string(),
});

const DeckSchema = z.object({
    cards: z.array(CardSchema),
});

export type Deck = z.infer<typeof DeckSchema>;

export type Card = z.infer<typeof CardSchema>;