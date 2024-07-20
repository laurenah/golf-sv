<script lang="ts">
	import Card from './Card.svelte';
	import type { Player } from '$lib/types';
	import { PLAYER_HUMAN } from '$lib/const';

	export let player: Player;
</script>

<div class="player-group-container">
    <div class="player-tag">
        {#if player.type === PLAYER_HUMAN}
            <h2>You</h2>
        {:else}
            <h2>CPU</h2>
        {/if}
    </div>
    
    <div class="grid">
        <!-- human player should be grid closest to keyboard -->
        {#each player.hand as card}
            <!-- add known back when in use -->
            <Card 
            suit={card.suit} 
            value={card.value}
            locked={card.locked}
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
        width: 50px;
        text-align: center;
        margin-right: 20px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 10px;
    }
</style>
