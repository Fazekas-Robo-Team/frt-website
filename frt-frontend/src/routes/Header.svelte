<script lang="ts">
// @ts-nocheck

	import './header.css';
	import { onMount } from 'svelte';

	// while scrolling down, scale the header background image
	onMount(() => {
		window.addEventListener('scroll', () => {
			let header = document.querySelector('header');
			let scale = 1 + window.scrollY / window.innerHeight;
			header.style.backgroundSize = `${(scale * 100) + 30}%`;
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

