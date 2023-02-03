<script lang="ts">
	import robot from '$lib/images/robot.jpg';
	import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';

	import ArticleCard from './Article_card.svelte';

	export let data: any;

	// cut the last 3 articles from the array
	data.posts = data.posts.slice(0, 3);
</script>

<div class="w-screen h-screen bg-light-green border-y-2 border-black flex flex-col items-center px-36 py-24 mb-64" id="blog">
	<div class="bg-medium-green px-3 pb-4 h-2 mt-4 mb-8 ml-4"><h1 class="text-black text-4xl font-semibold -mt-6 -ml-2">Blog</h1></div>
	<div class="cards-wrapper w-full h-5/6 flex row justify-between">
		{#each data.posts as article}
			<ArticleCard {article} />
		{/each}
	</div>
	<a
		href="/blog"
		class="bg-yellow py-4 px-6 border-black border-2 drop-shadow-xl-black-br mt-10 font-semibold text-xl hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
		>Tovább a blogra</a
	>
</div>
