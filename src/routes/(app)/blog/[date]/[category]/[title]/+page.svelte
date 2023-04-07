<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import Heading from '$lib/markdown/heading.svelte';
	import Link from '$lib/markdown/link.svelte';
	import Blockquote from '$lib/markdown/blockquote.svelte';
	import Codespan from '$lib/markdown/codespan.svelte';
	import Code from '$lib/markdown/code.svelte';
	import Table from '$lib/markdown/table.svelte';
	import Thead from '$lib/markdown/thead.svelte';
	import Tablecell from '$lib/markdown/tablecell.svelte';
	import Image from '$lib/markdown/image.svelte';
	import Paragraph from '$lib/markdown/paragraph.svelte';

    export let data: any;

    const source = data.post.content;
</script>

<svelte:head>
    <title>{data.post.title} - FRT Blog</title>
    <meta name="description" content={data.post.description} />
</svelte:head>

<article class="mt-24 mx-4 md:w-2/3 lg:w-1/2 md:mx-auto min-h-screen leading-8">
    <h1 class="font-semibold text-4xl mb-2">{data.post.title}</h1>
    <div class="flex align-center flex-col mb-8">
		<p>{data.post.date}</p>
		<p class="font-semibold">{data.post.author}</p>
	</div>
    <SvelteMarkdown {source} 
        renderers={{
            heading: Heading,
            link: Link,
            blockquote: Blockquote,
            codespan: Codespan,
            code: Code,
            table: Table,
            tablehead: Thead,
            tablecell: Tablecell,
            image: Image,
            paragraph: Paragraph
        }}
    />
</article>
