<script lang="ts">
  import { GAME_STATES } from '$lib/const';
  import { gameStore } from '../core/stores/gameStore';

  $: game = $gameStore;
  $: topCard = game.topCard;
  $: indicatePickup = game.currentPlayer === 1 && game.state === GAME_STATES.PLAYING;

  let color = topCard
    ? topCard.suit === '♥' || topCard.suit === '♦'
      ? 'red'
      : 'black'
    : 'black';
</script>

<button class="deck {indicatePickup ? 'glow' : ''}" on:click={undefined}>
  <div class="face"></div>
</button>

<button class="topcard {indicatePickup ? 'glow' : ''}">
  <div class="face {color}">
    <div class="value">{topCard ? topCard.value : '?'}</div>
    <div class="suit">{topCard ? topCard.suit : '?'}</div>
  </div>
</button>

<style>
  button:hover {
    transition: 0.6s;
    transform: scale(1.05);
  }

  .deck {
    position: relative;
    width: 100px;
    height: 140px;
    cursor: pointer;
    padding: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff6565;
    border: 10px solid white;
    box-sizing: border-box;
  }

  .topcard {
    position: relative;
    width: 100px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  .red {
    color: #ff6565;
  }

  .black {
    color: black;
  }

  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 15px 2px rgba(240, 240, 240, 0.8);
    }
    50% {
      box-shadow: 0 0 25px 3px rgba(240, 240, 240, 0.7);
    }
    100% {
      box-shadow: 0 0 15px 2px rgba(240, 240, 240, 0.8);
    }
  }

  .glow {
    box-shadow: 0 0 15px 3px rgba(240, 240, 240, 0.8);
    animation: pulseGlow 1.5s infinite;
  }
</style>
