<script lang="ts">
	import Card from './Card.svelte';
</script>

<div class="grid">
	<Card suit="♠" value={10} />
	<Card suit="♦" value={5} />
	<Card suit="♣" value={8} />
	<Card suit="♥" value={3} />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		padding: 10px;
	}
</style>
