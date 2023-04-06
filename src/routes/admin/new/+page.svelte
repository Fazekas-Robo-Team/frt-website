<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import Editor from "$lib/components/Editor.svelte";
    import MultipleImageUpload from '$lib/components/Multiple_image_upload.svelte';

    let title = '', content = '', description = '', category = '';

    async function submit() {
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

        // send post request
        fetch(`${PUBLIC_BACKEND_URL}/blog_admin/`, {
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
<Editor title={title} source={content} description={description} category={category} submit={submit} />