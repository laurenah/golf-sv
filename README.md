# Golf
![](https://github.com/laurenah/golf-sv/actions/workflows/ci.yml/badge.svg)

The Golf Card Game

## Installing

Install dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab at golf.test:3000
npm run dev -- --open
```

or `make build` to run a docker container, and navigate to `golf.test:3000`

## How to play (TBI)

This game is played with a standard deck of 52 cards.

The aim of the game, like actual golf, is to score as little as possible. The person who has the lowest score after someone reaches 100 points wins.

Each player is dealt 4 cards face down (all unknown and unlocked). The top card of the leftover deck is place face up next to the pick-up pile.

Then, each player may look at any two of their cards but only once and then they are placed face down again (known, but still unlocked).

Players take turns either picking up the face up card, or the top card of the pick-up pile. They may choose to swap a face down card with the card they pick, or reject it and flip one of their face down cards up. Each turn will result in the player turning one of their face down cards into a face up card. The player may even skip picking up a card and simply choose to flip one of their cards.

The game ends when all players have all 4 cards face up (all known).

Card states are as follows:

- Unknown: The player has not seen the card
- Known: The player has seen the card
- Unlocked (face down): The player may swap this card with a card they pick up
- Locked (face up): The player cannot swap this card with another card

## Scoring

Jacks and 2 are worth 0 points. Aces are worth 11 points. Face cards are worth 10 points, and the rest are worth their face value.

Cards have their points cancelled out to 0 when they are in pairs. 3 of a kind will result in 3 + card value. Getting 4 of a kind will reset your entire score to 0.

## Example

A player ends the round with two aces, a 5 and a 2. The aces cancel out, the 2 is worth 0, and the 5 is unpaired so their score for that round is 5.
