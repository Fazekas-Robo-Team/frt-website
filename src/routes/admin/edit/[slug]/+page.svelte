<script lang="ts">
    import { PUBLIC_BACKEND_URL, PUBLIC_IMAGE_URL } from "$env/static/public";
    import MultipleImageUpload from '$lib/components/Multiple_image_upload.svelte';
	import Image from "$lib/markdown/image.svelte";
	import { loading, modal } from "../../../../stores";

    export let data: any;

    let postData = data.postData;

    let title = postData.title, content = postData.content, description = postData.description, category = postData.category;

    async function submit() {
        loading.set(true);

        // get index-image from file input
        const fileInput = document.getElementById('index') as HTMLInputElement;
        const fileInput2 = document.getElementById('multiple-images') as HTMLInputElement;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('category', category);

        formData.append('index', fileInput.files![0]);

        for (let i = 0; i < fileInput2.files!.length; i++) {
            formData.append('images[]', fileInput2.files![i]);
        }

        fetch(`${PUBLIC_BACKEND_URL}/blog_admin/${data.slug}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            loading.set(false);
            if (data.success) {
                modal.set({
                    shown: true,
                    title: 'Success',
                    content: 'Post updated successfully',
                });

                // redirect to blog
                window.location.href = '/admin';
            } else {
                modal.set({
                    shown: true,
                    title: 'Error',
                    content: data.message,
                });
            }
        })
    }
</script>

<!-- new post form -->

<form id="form" class="flex flex-row w-3/4 mx-auto my-8" on:submit|preventDefault={submit}>
    <div class="flex flex-col w-2/3">
        <label for="title" class="text-lg font-semibold text-white">Title</label>

        <input disabled type="text" autocomplete="off" id="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={title} />
    
        <label for="description" class="text-lg font-semibold text-white">Description</label>
    
        <input type="text" autocomplete="off" id="description" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={description} />
    
        <label for="content" class="text-lg font-semibold text-white">Content</label>
    
        <textarea id="content" autocomplete="off" class="border-2 border-gray-300 p-2 rounded my-2 h-64" bind:value={content} />
    
        <label for="category" class="text-lg font-semibold text-white">Category</label>
    
        <input disabled type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={category} />
    
        <MultipleImageUpload />
    
        <!-- index image -->
    
        <label for="index" class="text-lg font-semibold text-white">Index Image (uneditable)</label>
    
        <input disabled type="file" id="index" class="border-2 border-white bg-white p-2 rounded my-2" />
    
        <button type="submit" class="bg-emerald-600 text-white p-2 rounded my-2 hover:brightness-75 transition-all">Save</button>
    </div>
    <div class="w-1/3">
        <h3 class="text-lg font-semibold text-white text-center">Already uploaded images</h3>
        <div class="grid grid-cols-2 gap-2 w-full">
            {#each data.imageUrls as imageUrl, i}
            <div>
                <img src={`${PUBLIC_IMAGE_URL}/${imageUrl}`} alt="Preview" class="w-32 h-32 m-2 object-cover" />
                <span class="text-white">{data.imageNames[i]}</span>
            </div>
            {/each}
        </div>
    </div>
</form>