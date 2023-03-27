<script lang="ts">
    import Card from "$lib/components/Card.svelte";

    export let data: any;

    let userData = data.userData;

    console.log(userData);
</script>

<svelte:head>
	<title>FRT Aktív tagok</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

<div class="min-h-screen mt-24 mx-4 lg:mx-20 xl:mx-44 px-3">
    <h1 class="text-center font-semibold text-3xl underline">Aktív tagok</h1>
    
    {#each userData as user}
        <Card {user} />
    {/each}
</div>