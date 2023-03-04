<script lang="ts">
    import { onMount } from 'svelte';
    let images: File[] = [];
  
    function handleFileInput(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      console.log(files);
      
      if (files) {
        images = Array.from(files);
        previewImages();
      }
    }
  
    let imagePreviews: string[] = [];
  
    function previewImages() {
      imagePreviews = [];
      images.forEach(image => {
        imagePreviews.push(URL.createObjectURL(image));
      });
    }
  
    onMount(() => {
      previewImages();
    });
  </script>
  
  <div class="flex flex-col">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="text-lg font-bold mb-2 text-white">Select images</label>
    <input type="file" name="post-images" multiple class="py-2 px-4 border border-gray-400 rounded-lg bg-white" on:change={handleFileInput}>
    <div class="flex flex-wrap mt-4 ">
      {#each imagePreviews as image, index}
        <div class="flex flex-col mr-4 mb-4">
          <img src="{image}" alt="Preview" class="h-32 w-32 object-cover rounded-lg mb-2">
        </div>
      {/each}
    </div>
  </div>
  