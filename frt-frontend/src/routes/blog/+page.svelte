<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';
</script>

<svelte:head>
	<title>FRT Blog</title>
	<meta name="description" content="FRT Blog" />
</svelte:head>

<div class="article">
	<img src="https://picsum.photos/500/500" alt="article" />
	<h1>Hello World</h1>
	<p>Lorem ipsum dolor sit amet</p>
	<div class="flex align-center">
		<img class="icon" src={Date} alt="" />
		<p class="bold">2023. 01. 29.</p>
	</div>
	<div class="flex align-center">
		<img class="icon" src={Pfp} alt=""/><p class="bold">Daniel Gergely</p>
	</div>
</div>
<div class="article">
	<img src="https://picsum.photos/500/500" alt="article" />
	<h1>Hello World</h1>
	<p>Lorem ipsum dolor sit amet</p>
	<div class="flex align-center">
		<img class="icon" src={Date} alt="" />
		<p class="bold">2023. 01. 29.</p>
	</div>
	<div class="flex align-center">
		<img class="icon" src={Pfp} alt=""/><p class="bold">Daniel Gergely</p>
	</div>
</div>
<div class="article">
	<img src="https://picsum.photos/500/500" alt="article" />
	<h1>Hello World</h1>
	<p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
	<div class="flex align-center">
		<img class="icon" src={Date} alt="" />
		<p class="bold">2023. 01. 29.</p>
	</div>
	<div class="flex align-center">
		<img class="icon" src={Pfp} alt=""/><p class="bold">Daniel Gergely</p>
	</div>
</div>
<div class="article">
	<img src="https://picsum.photos/500/500" alt="article" />
	<h1>Hello World</h1>
	<p>Lorem ipsum dolor sit amet</p>
	<div class="flex align-center">
		<img class="icon" src={Date} alt="" />
		<p class="bold">2023. 01. 29.</p>
	</div>
	<div class="flex align-center">
		<img class="icon" src={Pfp} alt=""/><p class="bold">Daniel Gergely</p>
	</div>
</div>

<style lang="scss">
	.article {
		height: 500px;
		width: 300px;
		background-color: white;
		padding: 1.5rem;
		margin: 1rem auto;
		border-radius: .5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	img {
		border-radius: .5rem;
		width: 100%;
		height: 50%;
		object-fit: cover;
	}

	img.icon {
		border-radius: 0;
		display: inline;
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.5rem;
	}
</style>
