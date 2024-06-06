<script lang="ts">
    import PlayerGrid from "./components/PlayerGrid.svelte";
</script>

<main>
    <h1>Golf</h1>

    <PlayerGrid />
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