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

<article>
    <h1>{data.title}</h1>
    <div class="flex align-center">
		<img class="icon" src={Date} alt="" /><p class="bold">{data.date}</p>
		<img class="icon pfp" src={Pfp} alt=""/><p class="bold">{data.author}</p>
	</div>
    <svelte:component this={data.content} />
</article>

<style>
    article {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 1.5rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    img.icon {
        border-radius: 0;
        display: inline;
        width: 1.4rem;
        height: 1.4rem;
        margin-right: .5rem;
    }

    img.pfp {
        margin-left: 1rem;
    }
</style>