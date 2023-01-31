<script lang="ts">
	import robot from '$lib/images/robot.jpg';
	import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';

	export let data: any;
</script>

<div class="fullscreen bg-purple flex flex-center column" id="blog">
	<h1 class="text-white">Blog</h1>
	<div class="cards-wrapper">
		<a href="{data.posts[0].path}"><div class="article">
			<img src="{data.posts[0].meta.index_image_url}" alt="article" />
			<h1>{data.posts[0].meta.title}</h1>
			<p>{data.posts[0].meta.description}</p>
			<div class="flex align-center">
				<img class="icon" src={Date} alt="" />
				<p class="bold">{data.posts[0].meta.date}</p>
			</div>
			<div class="flex align-center">
				<img class="icon" src={Pfp} alt=""/><p class="bold">{data.posts[0].meta.author}</p>
			</div>
		</div></a>
		<a href="{data.posts[0].path}"><div class="article">
			<img src="{data.posts[1].meta.index_image_url}" alt="article" />
			<h1>{data.posts[1].meta.title}</h1>
			<p>{data.posts[1].meta.description}</p>
			<div class="flex align-center">
				<img class="icon" src={Date} alt="" />
				<p class="bold">{data.posts[1].meta.date}</p>
			</div>
			<div class="flex align-center">
				<img class="icon" src={Pfp} alt=""/><p class="bold">{data.posts[1].meta.author}</p>
			</div>
		</div></a>
		<a href="{data.posts[0].path}"><div class="article">
			<img src="{data.posts[2].meta.index_image_url}" alt="article" />
			<h1>{data.posts[2].meta.title}</h1>
			<p>{data.posts[2].meta.description}</p>
			<div class="flex align-center">
				<img class="icon" src={Date} alt="" />
				<p class="bold">{data.posts[2].meta.date}</p>
			</div>
			<div class="flex align-center">
				<img class="icon" src={Pfp} alt=""/><p class="bold">{data.posts[2].meta.author}</p>
			</div>
		</div></a>
	</div>
	<p><a href="/blog" class="btn btn-secondary transition">Tovább a blogra</a></p>
</div>

<style lang="scss">
	.cards-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		height: 60%;
	}

	.article {
		height: 500px;
		width: 300px;
		background-color: white;
		padding: 1.5rem;
		margin: 2rem;
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

	.bold {
		font-weight: 600;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
