<script lang="ts">
	export let suit: string;
	export let value: string;
	export let known: boolean;
	export let locked: boolean;

	let color = suit === '♥' || suit === '♦' ? 'red' : 'black';
	let face = locked ? 'up' : 'down';
</script>

<div class="card {color} {face}">
	<div class="value">{value}</div>
	<div class="suit">{suit}</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 70px;
		background-color: white;
		box-shadow: inset 0 0 0 10px white;
		border-radius: 5px;
		margin: 5px;
	}

	.card.red {
		color: #ff6565;
	}

	.card.black {
		color: black;
	}

	.card.down {
		background-color: #ff6565;
		background-size: cover;
	}

	.card.down .value,
	.card.down .suit {
		display: none;
	}

	.value {
		font-size: 2rem;
	}

	.suit {
		font-size: 1.5rem;
	}
</style>
