<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';

	export let data: any;
	console.log(data);
</script>

<svelte:head>
	<title>FRT Blog</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

{#each data.posts as post}
<div class="article">
	<img src="{post.meta.index_image_url}" alt="article" />
	<h1>{post.meta.title}</h1>
	<p>{post.meta.description}</p>
	<div class="flex align-center">
		<img class="icon" src={Date} alt="" />
		<p class="bold">{post.meta.date}</p>
	</div>
	<div class="flex align-center">
		<img class="icon" src={Pfp} alt=""/><p class="bold">{post.meta.author}</p>
	</div>
</div>
{/each}

<style lang="scss">
	.article {
		height: 500px;
		width: 300px;
		background-color: white;
		padding: 1.5rem;
		margin: 1rem auto;
		border-radius: .5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	img {
		border-radius: .5rem;
		width: 100%;
		height: 50%;
		object-fit: cover;
	}

	img.icon {
		border-radius: 0;
		display: inline;
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.5rem;
	}
</style>
