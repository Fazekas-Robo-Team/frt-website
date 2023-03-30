<script lang="ts">
	import { onMount } from 'svelte';
	let images: File[] = [];

	function handleFileInput(event: Event) {
		const files = (event.target as HTMLInputElement).files;

		if (files) {
			// add images that are not already in the array
			images = [...images, ...Array.from(files).filter((file) => !images.includes(file))];
			previewImages();
		}
	}

	function removeImage(index: number) {
		images.splice(index, 1);
		previewImages();
	}

	let imagePreviews: any[] = [];

	function previewImages() {
		imagePreviews = [];
		images.forEach((image) => {
			imagePreviews.push({image: URL.createObjectURL(image), filename: image.name});
		});
	}

	onMount(() => {
		previewImages();
	});
</script>

<div class="flex flex-col">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="text-lg font-bold mb-2 text-white">Select images</label>
	<input id="multiple-images" type="file" name="post-images" multiple class="py-2 px-4 border border-gray-400 rounded-lg bg-white" on:change={handleFileInput} />
	<div class="flex flex-wrap mt-4 ">
		{#each imagePreviews as image, index}
			<div class="flex flex-col mr-4 mb-4">
				<img src={image.image} alt="Preview" class="h-32 w-32 object-cover rounded-lg mb-2" />
				<span class="text-white">{image.filename}</span>
				
				<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" on:click={() => removeImage(index)}>Remove</button>
			</div>
		{/each}
	</div>
</div>
