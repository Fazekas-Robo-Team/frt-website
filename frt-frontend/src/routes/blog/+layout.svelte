<script>
	import BlogNavbar from '$lib/components/BlogNavbar.svelte';
	import '../styles.css';
</script>

<div class="app">
    <BlogNavbar />
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
</style>