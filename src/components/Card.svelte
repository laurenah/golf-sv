<script lang="ts">
	export let suit: string;
	export let value: string;
	export let known: boolean;
	export let locked: boolean;

	let color = suit === '♥' || suit === '♦' ? 'red' : 'black';
	let face = locked ? 'up' : 'down';
	$: rotation = locked ? 'rotateY(0deg)' : 'rotateY(180deg)';
</script>

<button class="card {face}" 
	on:click={() => (locked = !locked)}
	style="transform: {rotation}"
	>
	<div class="face front {color}">
		<div class="value">{value}</div>
		<div class="suit">{suit}</div>
	</div>
	<div class="face back"></div>
</button>

<style>
	button:hover {
		border: none;
		transition: 0.6s;
		transform: scale(1.1);
	}

	.card {
        transform-style: preserve-3d;
        transition: transform 0.6s;
        position: relative;
        width: 100px;
        height: 140px;
        cursor: pointer;
        padding: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
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

	.front, .back {
		backface-visibility: hidden;
	}

    .front {
        background-color: white;
    }

    .back {
        background-color: #ff6565;
        transform: rotateY(180deg);
		border: 10px solid white;
    	box-sizing: border-box;
    }

	.red {
		color: #ff6565;
	}

	.black {
		color: black;
	}
</style>
