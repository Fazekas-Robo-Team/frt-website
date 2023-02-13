<script lang="ts">
    import Date from '$lib/images/date.svg';
	import Pfp from '$lib/images/pfp.svg';

    interface Article {
        title: string;
        date: string;
        description: string;
        content: any;
        author: string;
    }

    export let data: Article;
</script>

<svelte:head>
    <title>{data.title} - FRT Blog</title>
    <meta name="description" content={data.description} />
</svelte:head>

<article class="mt-24 mx-4 md:w-2/3 lg:w-1/2 md:mx-auto min-h-screen">
    <h1 class="font-semibold text-3xl mb-2">{data.title}</h1>
    <div class="flex align-center flex-col mb-8">
		<p>{data.date}</p>
		<p class="font-semibold">{data.author}</p>
	</div>
    <svelte:component this={data.content} />
</article>
