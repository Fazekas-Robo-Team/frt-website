<script>
	import { onMount } from 'svelte';

	export let autoTransparent = false;

	let isMenuTransparent = true;

	let isMobileMenuOpen = false;

	onMount(() => {
		if (window.scrollY > window.innerHeight * 0.8) {
			isMenuTransparent = false;
		} else {
			isMenuTransparent = true;
		}

		if (autoTransparent) {
			window.addEventListener('scroll', () => {
				// if scrolled down 100vh then change menu background color
				if (window.scrollY > window.innerHeight * 0.8) {
					isMenuTransparent = false;
				} else {
					isMenuTransparent = true;
				}
			});
		} else {
			isMenuTransparent = false;
		}
	});

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<!-- Desktop navbar -->
<nav class="desktop transition {isMenuTransparent ? 'bg-transparent' : 'bg-low'}">
	<ul>
		<li class="left"><a class="bold" href="/">FRT</a></li>
		<li class="right"><a href="/#about">Rólunk</a></li>
		<li class="right"><a href="/#blog">Blog</a></li>
		<li class="right"><a href="/#current">Aktuális</a></li>
	</ul>
</nav>

<!-- Mobile navbar -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<nav class="mobile transition {isMenuTransparent ? 'bg-transparent' : 'bg-low'}">
	<ul>
		<li>
			<div class="left">
				<a class="bold" href="/">FRT</a>
			</div>
		</li>
		<li>
			<div class="right hamburger-wrapper {isMobileMenuOpen ? "close" : "open"}" on:click={toggleMenu}>
				<div class="hamburger">
					<div class="line" />
					<div class="line" />
					<div class="line" />
				</div>
			</div>
		</li>
		
	</ul>
	
</nav>

<div class="mobile menu {isMobileMenuOpen ? "" : "closed"} bg-low">
	<ul>
		<li><a on:click={toggleMenu} href="/#current">Aktuális</a></li>
		<li><a on:click={toggleMenu} href="/#blog">Blog</a></li>
		<li><a on:click={toggleMenu} href="/#about">Rólunk</a></li>
	</ul>
</div>

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
		}

		.left {
			float: left;
		}

		.right {
			float: right;
		}
	}

	.desktop {
		display: block;
	}

	.mobile {
		display: none;
	}

	.hamburger-wrapper {
		padding: 15px 20px;
	}

	.hamburger {
		width: 30px;
		height: 22px;
		position: relative;
		cursor: pointer;

		.line {
			width: 100%;
			height: 3px;
			border-radius: 99px;
			background-color: white;
			position: absolute;
			transition: all 0.3s ease-in-out;

			&:nth-child(1) {
				top: 0;
			}

			&:nth-child(2) {
				top: 50%;
				transform: translateY(-50%);
			}

			&:nth-child(3) {
				bottom: 0;
			}
		}
	}

	/* hamburger animation */
	.hamburger-wrapper.close {
		.hamburger {
			.line {
				&:nth-child(1) {
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
				}

				&:nth-child(2) {
					opacity: 0;
				}

				&:nth-child(3) {
					top: 50%;
					transform: translateY(-50%) rotate(-45deg);
				}
			}
		}
	}

	.menu {
		position: fixed;
		top: 64px;
		left: 0;
		z-index: 99;
		width: 100%;
		height: calc(100vh - 64px);
		transition: 0.3s;
		backdrop-filter: blur(30px) brightness(0.8);

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;

			li {
				a {
					display: block;
					color: white;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
					transition: 0.3s;
					font-size: 26px;

					&:hover {
						filter: brightness(0.7);
					}
				}
			}
		}
	}

	/* float down the menu from the top */
	.menu.closed {
		top: 200vh;
	}
	

	/* media queries */

	@media screen and (max-width: 992px) {
		.desktop {
			display: none;
		}

		.mobile {
			display: block;
		}
	}
</style>
