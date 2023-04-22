<script lang="ts">
	import { onMount } from 'svelte';
	import { loading, modal } from '../../../../stores';
	import Editor from '$lib/components/Editor.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let articleData = data.article!;

	let id = articleData.id,
        title = articleData.title,
		content = articleData.content || '',
		description = articleData.description || '',
		category = articleData.category || '',
        author = articleData.profiles.full_name;

	let showSaved = false;

	onMount(() => {
		// set title
		document.title = `Editing: ${title}`;
	});

</script>

<Editor bind:title bind:source={content} bind:description bind:category bind:showSaved postId={id} author={author} indexDisabled={true} />