<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import MultipleImageUpload from '$lib/components/Multiple_image_upload.svelte';

    let title = '', content = '', description = '', category = '';

    function submit() {
        // get index-image from file input
        const fileInput = document.getElementById('index') as HTMLInputElement;
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('category', category);

        formData.append('index', fileInput.files![0]);

        // send post request
        fetch(`${PUBLIC_BACKEND_URL}/blog/`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // redirect to blog
                window.location.href = '/admin';
            }
        })
    }
</script>

<!-- new post form -->

<form id="form" class="flex flex-col w-1/2 mx-auto my-8" on:submit|preventDefault={submit}>

    <label for="title" class="text-lg font-semibold text-white">Title</label>

    <input type="text" autocomplete="off" id="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={title} />

    <label for="description" class="text-lg font-semibold text-white">Description</label>

    <input type="text" autocomplete="off" id="description" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={description} />

    <label for="content" class="text-lg font-semibold text-white">Content</label>

    <textarea id="content" autocomplete="off" class="border-2 border-gray-300 p-2 rounded my-2 h-64" bind:value={content} />

    <label for="category" class="text-lg font-semibold text-white">Category</label>

    <input type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={category} />

    <MultipleImageUpload />

    <!-- index image -->

    <label for="index" class="text-lg font-semibold text-white">Index Image</label>

    <input type="file" id="index" class="border-2 border-white bg-white p-2 rounded my-2" />

    <button type="submit" class="bg-emerald-600 text-white p-2 rounded my-2 hover:brightness-75 transition-all">Save</button>
</form>