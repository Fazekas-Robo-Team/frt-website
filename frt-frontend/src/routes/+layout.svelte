<script>
	import Navbar from '../lib/components/Navbar.svelte';
	import '../app.scss';
	import './styles.css';
	import Footer from '../lib/components/Footer.svelte';

</script>

<div class="app">
	<Navbar />
	<slot />
	<Footer />
</div>
