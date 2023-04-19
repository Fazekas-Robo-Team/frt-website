<script lang="ts">
	import ArticleCard from './Article_card.svelte';

	export let articles: any;

	console.log(articles, 'articles');
</script>

<div class="w-screen h-fit lg:h-screen bg-light-green border-y-2 border-black flex flex-col justify-center items-center px-3 md:px-4 xl:px-20 2xl:px-36 py-24 mb-64" id="blog">
	<div class="bg-medium-green px-3 pb-4 h-2 mt-4 mb-8 ml-4"><h2 class="text-black text-4xl font-semibold -mt-6 -ml-2">Blog</h2></div>
	<div class="cards-wrapper w-5/6 lg:w-full h-5/6 flex flex-col lg:flex-row justify-center lg:justify-between">
		{#each articles as article}
			<ArticleCard {article} />
		{/each}
	</div>
	<a
		href="/blog"
		class="bg-yellow py-4 px-6 border-black border-2 drop-shadow-xl-black-br mt-10 font-semibold text-xl hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
		>Tovább a blogra</a
	>
</div>
