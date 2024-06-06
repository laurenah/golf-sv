<script lang="ts">
    export let suit: string;
    export let value: number;
</script>

<div class="card {suit === '♥' || suit === '♦' ? 'red' : 'black'}">
    <div class="value">{value}</div>
    <div class="suit">{suit}</div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 150px;
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
        margin: 5px;
    }

    .card.red {
        color: red;
    }

    .card.black {
        color: black;
    }

    .value {
        font-size: 2rem;
    }

    .suit {
        font-size: 1.5rem;
    }
</style>