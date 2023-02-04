<script>
	import { onMount } from 'svelte';
	
	let isMobileMenuOpen = false;

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<!-- Desktop navbar -->
<nav class="desktop hidden border-b-2 border-b-black md:block">
	<ul>
		<li class="float-left">
			<a class="font-bold logo" href="/">Fazekas<span class="purple">RoboTeam</span></a>
		</li>
		<li class="float-right"><a href="/#about">Rólunk</a></li>
		<li class="float-right"><a href="/#blog">Blog</a></li>
		<li class="float-right"><a href="/">Aktuális</a></li>
	</ul>
</nav>

<!-- Mobile navbar -->
<nav class="mobile md:hidden p-4 flex flex-row justify-between items-center border-b-2 border-b-black">
	<div class="float-left w-1/2">
		<a class="font-bold logo" href="/">Fazekas<span class="purple">RoboTeam</span></a>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="float-right h-full hamburger-wrapper {isMobileMenuOpen ? 'close' : 'open'}" on:click={toggleMenu}>
		<div class="hamburger">
			<div class="line" />
			<div class="line" />
			<div class="line" />
		</div>
	</div>
</nav>

<div class="mobile menu {isMobileMenuOpen ? '' : 'closed'} bg-white">
	<ul>
		<li><a on:click={toggleMenu} href="/">Aktuális</a></li>
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
		background-color: white;

		ul {
			list-style-type: none;
			margin: 0;
			padding: 5px 5rem;
			overflow: hidden;

			li {
				a {
					display: block;
					color: black;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
					transition: 0.3s;

					&:not(.logo) {
						&:after {
							content: '';
							display: block;
							width: 0;
							height: 2px;
							background: #000000;
							transition: width 0.3s;
						}
					}

					&:hover {
						&:not(.logo) {
							&:after {
								width: 100%;
							}
						}
					}

					.purple {
						color: #9461ff;
					}
				}
			}
		}
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
			background-color: black;
			position: absolute;

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
		backdrop-filter: blur(30px) brightness(0.8);

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;

			li {
				a {
					display: block;
					color: black;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
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
</style>
