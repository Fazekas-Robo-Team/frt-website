<script>
	import Navbar from '../lib/components/Navbar.svelte';
	import BlogHomepage from '../lib/components/Blog_homepage.svelte';
	import Current from '../lib/components/Current.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Header from '../lib/components/Header.svelte';
	import About from '../lib/components/About.svelte';
</script>

<svelte:head>
	<title>Fazekas RoboTeam</title>
	<meta name="description" content="Fazekas RoboTeam" />
</svelte:head>
<Navbar autoTransparent={true} />
<Header />
<Current />
<BlogHomepage />
<About />
<Footer />
