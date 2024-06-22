<script lang="ts">
	import Card from './Card.svelte';
	import type { Player } from '$lib/types';

	export let player: Player;
</script>

<div class="grid">
	{#each player.hand as card}
		<Card 
		suit={card.suit} 
		value={card.value} 
		known={card.known}
		locked={card.locked}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		padding: 10px;
	}
</style>
