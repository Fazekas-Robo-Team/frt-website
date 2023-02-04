<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';
	import ArticleCard from '$lib/components/Article_card_blogpage.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>FRT Blog</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

<div class="min-h-screen px-8 mt-24 mb-8 w-screen grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#each data.posts as article}
	<ArticleCard {article} />
	{/each}
</div>
