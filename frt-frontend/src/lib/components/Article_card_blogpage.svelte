<script context="module" lang="ts">
	export interface Article {
		path: string;
		meta: {
			title: string;
			description: string;
			date: string;
			author: string;
			index_image_url: string;
		};
	}
</script>

<script lang="ts">
	export let article: Article;
</script>

<a class="mx-2 md:h-full xl:mx-8 mb-8 lg:mb-0" href={article.path}
	><div
		class="bg-white w-full h-full p-8 flex flex-col justify-between border-black border-2 drop-shadow-xl-black-br hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
	>
		<div class="h-fit lg:h-4/5">
			<img class="w-full h-64 lg:h-1/2 object-cover object-center border-black border-2" src={article.meta.index_image_url} alt="article" />
			<h1 class="font-semibold text-2xl my-2">{article.meta.title}</h1>
			<p class="text-md">{article.meta.description}</p>
		</div>
		<div class="bg-medium-green pb-3 h-2 w-fit -ml-1 mt-12">
			<p class="font-semibold text-lg -mt-10 ml-1">{article.meta.author}</p>
			<p class="font-semibold text-lg ml-1">{article.meta.date}</p>
		</div>
	</div></a
>
