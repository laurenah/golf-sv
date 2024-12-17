<script lang="ts">
  import Card from './Card.svelte';
  import type { Card as CardType, Player } from '$lib/types';
  import { GAME_STATES, PLAYER_HUMAN } from '$lib/const';
  import { gameStore } from '../core/stores/gameStore';
  import { peekCards } from '../core/Game';

  $: game = $gameStore;

  export let player: Player;
  let peekedCards: CardType[] = [];

  function handlePeek(card: CardType) {
    if (peekedCards.length < 2) {
      peekedCards = [...peekedCards, card];
      if (peekedCards.length === 2) {
        setTimeout(() => {
          peekCards(player, peekedCards);
          peekedCards = [];
        }, 10000);
      }
    }
  }
</script>

<div class="player-group-container">
  <div class="player-tag">
    {#if player.type === PLAYER_HUMAN}
      <h2>You</h2>
      {#if game.state === GAME_STATES.PEEKING}
        <p style="width: 200px; text-align: right;">Pick two cards to see and memorise</p>
      {/if}
    {:else}
      <h2>CPU</h2>
    {/if}
  </div>

  <div class="grid {peekedCards.length === 2 ? 'disabled' : ''}">
    {#each player.hand as card}
      <Card
        suit={card.suit}
        value={card.value}
        locked={card.locked}
        known={peekedCards.some((c) => c.suit === card.suit && c.value === card.value)}
        canPeek={game.state === GAME_STATES.PEEKING && player.type === PLAYER_HUMAN}
        onPeek={handlePeek}
      />
    {/each}
  </div>
</div>

<style>
  .player-group-container {
    display: flex;
    align-items: center;
  }

  .player-tag {
    display: flex;
    flex-direction: column;
    width: 200px;
    text-align: right;
    padding-right: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .disabled {
    pointer-events: none;
  }
</style>
