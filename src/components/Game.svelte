<script lang="ts">
	import PlayerGrid from "./PlayerGrid.svelte";
	import { gameStore } from "../core/stores/gameStore";
	import { dealHands, setupGame } from "../core/Game";

    $: game = $gameStore;

    function newGame() {
        let newGame = setupGame();
        gameStore.set(newGame);
        dealHands();
    }
</script>

<div>
    {#if game}
        {#each game.players as player}
            <PlayerGrid {player} />
        {/each}
    {:else}
        <button on:click={newGame}>New Game</button>
    {/if}
</div>