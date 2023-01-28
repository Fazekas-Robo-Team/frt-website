<script>
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

<style lang="scss">
	nav {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 100;
		font-size: 22px;
		backdrop-filter: blur(30px);

		ul {
			list-style-type: none;
			margin: 0;
			padding: 5px 45px;
			overflow: hidden;

			li {
				a {
					display: block;
					color: white;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
					transition: 0.3s;

					&:hover {
						filter: brightness(0.7);
					}
				}
			}

			li.left {
				float: left;
			}

			li.right {
				float: right;
			}
		}
	}
</style>
