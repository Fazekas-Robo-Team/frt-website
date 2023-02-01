<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';

	// while scrolling down, scale the header background image
	onMount(() => {
		window.addEventListener('scroll', () => {
			let header = document.querySelector('header');
			let scale = 1 + window.scrollY / window.innerHeight;
			if (window.innerWidth > 1200) {
				header.style.backgroundSize = `${scale * 100 + 50}%`;
			} else {
				header.style.backgroundSize = `${scale * 100 + 140}%`;
			}
		});

		window.addEventListener('resize', () => {
			let header = document.querySelector('header');
			let scale = 1 + window.scrollY / window.innerHeight;
			if (window.innerWidth > 1200) {
				header.style.backgroundSize = `${scale * 100 + 50}%`;
			} else {
				header.style.backgroundSize = `${scale * 100 + 140}%`;
			}
		});
	});
</script>

<header class="fullscreen">
	<div>
		<div class="content text-white">
			<h1>Fazekas RoboTeam</h1>
			<h3>Robotika 2003 óta</h3>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		background-color: black;
		background-image: url('$lib/images/header_bg.png');
		background-size: 150%;
		background-position: center;
		background-repeat: no-repeat;
		backdrop-filter: blur(30px) brightness(0.9);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 1200px) {
		header {
			background-size: 240%;
		}
	}
</style>
