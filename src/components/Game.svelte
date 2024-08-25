<script lang="ts">
  import PlayerGrid from './PlayerGrid.svelte';
  import { gameStore } from '../core/stores/gameStore';
  import { dealHands, setupGame } from '../core/Game';
  import { GAME_STATES, PLAYER_COMPUTER } from '$lib/const';
  import Deck from './Deck.svelte';

  $: game = $gameStore;

  function newGame() {
    let newGame = setupGame();
    gameStore.set(newGame);
    dealHands();
  }
</script>

<div>
  {#if game}
  <div class="game-container">
    <!-- Peeking cards -->
    {#if game.currentPlayer === undefined} 
      <div class={game.players.length === 4 ? 'grid-2x2' : 'grid-stack'}>
        {#each game.players as player}
          <div class="player-container {player.type === PLAYER_COMPUTER ? 'cpu' : ''}">
            <PlayerGrid {player} />
          </div>
        {/each}
      </div>
      <div class="deck-container">
        <Deck />
      </div>
    {:else}
    <!-- Normal turn -->
      <div class={game.players.length === 4 ? 'grid-2x2' : 'grid-stack'}>
        {#each game.players as player}
          <div class="player-container {player.type === PLAYER_COMPUTER ? 'cpu' : ''}">
            <PlayerGrid {player} />
          </div>
        {/each}
      </div>
      <div class="deck-container">
        <Deck />
      </div>
    {/if}
  </div>
  {:else}
    <button on:click={newGame}>New Game</button>
  {/if}
</div>

<style>
  .game-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .grid-2x2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .grid-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .player-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .cpu {
    pointer-events: none;
  }

  .deck-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
</style>
