<script lang="ts">
	import BlogHomepage from '$lib/components/Blog_homepage.svelte';
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Muhely from '$lib/components/Muhely.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Fazekas RoboTeam</title>
	<meta name="description" content="A Fazekas RoboTeam egy 2003-ban indult robotika szakkör a Fazekas Mihály Gimnáziumban." />
</svelte:head>
<Header featured={data.featured} />
<BlogHomepage articles={data.articles}/>
<Muhely />
<About />
