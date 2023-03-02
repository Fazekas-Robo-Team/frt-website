<script lang="ts">
	import { onMount } from "svelte";


	export let data: any;

    onMount(() => {
        console.log(data);
    });
</script>

<!-- iter through the posts -->
{#each data.posts.data as post}
    <!-- create a link to the post -->
    <a href="/admin/blog/{post.slug}">
        <!-- display the post -->
        <div class="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-lg shadow-md">
            <h1 class="text-2xl font-semibold">{post.title}</h1>
            <p class="text-gray-500">{post.date}</p>
        </div>
    </a>
{/each}