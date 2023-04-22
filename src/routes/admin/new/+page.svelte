<script lang="ts">
	import Editor from "$lib/components/Editor.svelte";
    import MultipleImageUpload from '$lib/components/Multiple_image_upload.svelte';
	import { modal } from "../../../stores";

    let title = '', content = '', description = '', category = '', showSaved = false;

    async function submit(event: Event) {
        // get index-image from file input
        const fileInput = document.getElementById('index') as HTMLInputElement;
        //const fileInput2 = document.getElementById('multiple-images') as HTMLInputElement;

        // check if all fields are filled
        if (!title || !content || !description || !category || !fileInput.files![0]) {
            modal.set({
                title: 'Error',
                content: 'Please fill out all fields',
                shown: true
            });
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('category', category);

        formData.append('index', fileInput.files![0]);

        /*for (let i = 0; i < fileInput2.files!.length; i++) {
            formData.append('images[]', fileInput2.files![i]);
        }*/


    }
</script>

<!-- new post form -->
