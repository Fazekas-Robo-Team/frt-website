<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	beforeNavigate(() => {
		let root = document.getElementsByTagName('html')[0];
		root.classList.remove('smoothscroll');
	});

	afterNavigate(() => {
		let root = document.getElementsByTagName('html')[0];
		root.classList.add('smoothscroll');
	});
</script>

<div class="app">
	<Navbar />
	<slot />
	<Footer />
</div>
