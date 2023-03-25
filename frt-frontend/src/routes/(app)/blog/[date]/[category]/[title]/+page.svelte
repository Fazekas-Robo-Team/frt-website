<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import heading from '$lib/markdown/heading.svelte';

    export let data: any;

    const source = data.post.content;

    console.log(source);
</script>

<svelte:head>
    <title>{data.post.title} - FRT Blog</title>
    <meta name="description" content={data.post.description} />
</svelte:head>

<article class="mt-24 mx-4 md:w-2/3 lg:w-1/2 md:mx-auto min-h-screen leading-8">
    <h1 class="font-semibold text-3xl mb-2">{data.post.title}</h1>
    <div class="flex align-center flex-col mb-8">
		<p>{data.post.date}</p>
		<p class="font-semibold">{data.post.author}</p>
	</div>
    <SvelteMarkdown {source} 
        renderers={{
            heading: heading
        }}
    />
</article>
