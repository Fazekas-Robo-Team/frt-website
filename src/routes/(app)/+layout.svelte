<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CookiePopup from '$lib/components/Cookie_popup.svelte';
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
	<CookiePopup />
	<Footer />
</div>
