<script lang="ts">
	import { PUBLIC_BACKEND_URL, PUBLIC_IMAGE_URL } from '$env/static/public';
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

	async function submit() {
		loading.set(true);

		// get index-image from file input
		const fileInput = document.getElementById('index') as HTMLInputElement;
		//const fileInput2 = document.getElementById('multiple-images') as HTMLInputElement;

		const formData = new FormData();

		formData.append('title', title);
		formData.append('content', content);
		formData.append('description', description);
		formData.append('category', category);

		formData.append('index', fileInput.files![0]);

		/*for (let i = 0; i < fileInput2.files!.length; i++) {
            formData.append('images[]', fileInput2.files![i]);
        }*/

		fetch(`${PUBLIC_BACKEND_URL}/blog_admin/${data.slug}`, {
			method: 'PUT',
			credentials: 'include',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				loading.set(false);
				if (data.success) {
					showSaved = true;
					setTimeout(() => {
						showSaved = false;
					}, 4000);
				} else {
					modal.set({
						shown: true,
						title: 'Error',
						content: data.message
					});
				}
			});
	}
</script>

<Editor bind:title bind:source={content} bind:description bind:category bind:showSaved postId={id} author={author} indexDisabled={true} {submit} />