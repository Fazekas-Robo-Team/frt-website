<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../../app.scss';
	import '../styles.css';
	import Footer from '$lib/components/Footer.svelte';
	import CookiePopup from '$lib/components/Cookie_popup.svelte';

</script>

<div class="app">
	<Navbar />
	<slot />
	<CookiePopup />
	<Footer />
</div>
