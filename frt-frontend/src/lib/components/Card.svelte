<script lang="ts">
	import type Social from './About.svelte';

	export let title: string = '';
	export let roles: string[] = [];
	export let img: string = 'https://avatars.githubusercontent.com/u/44097962?v=4';
</script>

<div class="w-full h-fit flex flex-col md:flex-row my-8 bg-white border-black border-2 drop-shadow-xl-black-br">
	<div class="md:w-1/3 md:mb-4 flex flex-col justify-center items-center">
		<img class="w-2/5 md:w-4/5 xl:w-3/5 mt-4 border-black border-2" src={img} alt="robot" />
		<div class="flex flex-col items-center justify-center m-2">
			<p class="font-semibold text-2xl mb-2">{title}</p>
			<h4>
				{#each roles as role}
					<span class="border-black bg-white border-2 m-2 p-1 drop-shadow-md-purple-br">{role}</span>
				{/each}
			</h4>
		</div>
	</div>
	<p class="m-4 md:w-2/3">
		Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem
		ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum
		dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
	</p>
</div>
