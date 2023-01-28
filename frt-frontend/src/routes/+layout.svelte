<script>
	import BlogHomepage from '../lib/components/Blog_homepage.svelte';
	import Current from '../lib/components/Current.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Header from '../lib/components/Header.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import About from '../lib/components/About.svelte';
	import './styles.css';
</script>

<div class="app">
	<Navbar />
	<Header />
	<Current />
	<BlogHomepage />
	<About />
	<Footer />
</div>

