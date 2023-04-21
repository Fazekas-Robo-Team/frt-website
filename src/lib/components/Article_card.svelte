<script lang="ts">
	export let article: any;
</script>

<a class="w-full lg:w-1/3 h-fit lg:h-full lg:mx-4 xl:mx-8 mb-8 lg:mb-0" href="/blog/{article.slug}"
	><div
		class="bg-white w-full h-full p-6 flex flex-col justify-between border-black border-2 drop-shadow-xl-black-br hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
	>
		<div class="h-fit lg:h-4/5">
			<img class="w-full aspect-video object-cover object-center border-black border-2" src="{article.index_url}" alt="article" />
			<h3 class="font-semibold text-xl my-2">{article.title}</h3>
			<p class="text-md">{article.description}</p>
		</div>
		<div class="bg-medium-green pb-3 h-2 w-fit -ml-1 mt-12">
			<p class="font-semibold text-md -mt-10 ml-1">{article.profiles.full_name}</p>
			<p class="font-semibold text-lg ml-1">{article.date}</p>
		</div>
	</div></a
>
