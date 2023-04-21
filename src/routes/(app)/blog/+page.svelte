<script lang="ts">
	import ArticleCard from '$lib/components/Article_card_blogpage.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>FRT Blog</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

<div class="px-8 mt-24 mb-8 w-screen grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#each data.articles as article}
	<ArticleCard {article} />
	{/each}
</div>
