<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import BlogHomepage from '$lib/components/Blog_homepage.svelte';
	import Current from '$lib/components/Current.svelte';
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Muhely from '$lib/components/Muhely.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>Fazekas RoboTeam</title>
	<meta name="description" content="Fazekas RoboTeam" />
</svelte:head>
<Header />
<BlogHomepage data={data}/>
<Muhely />
<About />
