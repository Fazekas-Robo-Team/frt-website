<script>
	import BlogHomepage from './Blog_homepage.svelte';
	import Current from './Current.svelte';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Navbar from './Navbar.svelte';
	import About from './About.svelte';
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

