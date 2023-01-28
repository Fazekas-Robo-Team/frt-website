<script>
	import './navbar.css';
	import { onMount } from 'svelte';

	let isMenuTransparent = true;

	onMount(() => {
		window.addEventListener('scroll', () => {
			// if scrolled down 100vh then change menu background color
			if (window.scrollY > window.innerHeight * 0.8) {
				isMenuTransparent = false;
			} else {
				isMenuTransparent = true;
			}
		});
	});
</script>

<nav class="transition {isMenuTransparent ? 'bg-transparent' : 'bg-low'}">
	<ul>
		<li class="left"><a class="transition bold" href="">FRT</a></li>
		<li class="right"><a class="transition" href="#about">Rólunk</a></li>
		<li class="right"><a class="transition" href="#blog">Blog</a></li>
		<li class="right"><a class="transition" href="#current">Aktuális</a></li>
	</ul>
</nav>
