<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../styles.css';
</script>

<div class="app">
    <Navbar autoTransparent={false} />
    <div class="container">
	<slot></slot>
    </div>
</div>

<style lang="scss">
    .container {
		margin: 7vh auto;
		max-width: 1200px;
		display: grid;
		grid-template-columns: auto auto auto;
	}

	@media screen and (max-width: 1200px) {
		.container {
			grid-template-columns: auto auto;
			max-width: 800px;
		}
	}

	@media screen and (max-width: 992px) {
		.container {
			grid-template-columns: auto;
		}
	}
</style>