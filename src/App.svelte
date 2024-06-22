<script lang="ts">
	import Game from './components/Game.svelte';
</script>

<main>
	<h1>Golf</h1>

	<Game />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}

	h1 {
		font-size: 2rem;
	}
</style>
