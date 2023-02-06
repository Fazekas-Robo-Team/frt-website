<script lang="ts">
    import Card from "$lib/components/Card.svelte";
</script>

<svelte:head>
	<title>FRT Aktív tagok</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

<div class="min-h-screen mt-24 mx-4 lg:mx-20 xl:mx-44 px-3">
    <h1 class="text-center font-semibold text-3xl underline">Aktív tagok</h1>
    <Card title="Kovacs Bence" roles={["Senior tag", "Coach"]} />
    <Card title="Kovacs Bence" roles={["Senior tag"]} />
    <Card title="Kovacs Bence" roles={["Senior tag"]} />
    <Card title="Kovacs Bence" roles={["Senior tag"]} />
    <Card title="Kovacs Bence" roles={["Senior tag"]} />
    <Card title="Kovacs Bence" roles={["Senior tag"]} />
</div>