<script lang="ts">
    interface Article {
        title: string;
        date: string;
        description: string;
        content: any;
    }

    export let data: Article;
</script>

<svelte:head>
    <title>{data.title} - FRT Blog</title>
    <meta name="description" content={data.description} />
</svelte:head>

<article>
    <h1>{data.title}</h1>
    <p>{data.date}</p>
    <svelte:component this={data.content} />
</article>