<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';

	import current_article_index_pic from '$lib/images/robot.jpg';
</script>

<header class="w-screen h-screen border-b-black border-b-2 bg-light-blue flex flex-col md:flex-row justify-center md:justify-between items-center px-20 mb-64">
	<div class="text-gray h-fit w-full md:w-4/5 lg:w-2/5 text-xl md:text-2xl lg:text-3xl font-medium mt-12 md:mt-0 mb-32 md:mb-0 mx-4">
		<h3 class="leading-8 md:leading-10">
			A <span class="bg-white border-2 border-black drop-shadow-md-purple-tr text-black font-bold px-1">Fazekas RoboTeam</span> egy 2003-ban indult robotika szakkör <strong>a Fazekas Mihály Gimnáziumban.</strong>
		</h3>
	</div>
	<a class="group mx-4 w-full md:w-3/6" href="/"><div class="flex items-center flex-col w-full h-full">
		<div class="bg-white w-4/5 md:w-3/5 text-lg md:text-xl lg:text-2xl font-semibold border-black border-2 -mb-4 z-10 p-1 md:p-2 -mr-24 group-hover:translate-x-5px group-hover:translate-y-5px">Indul a WRO 2023-as szezonja!</div>
		<div class="border-black border-2 bg-white flex justify-center items-center drop-shadow-xl-purple-br group-hover:drop-shadow-md-purple-br group-hover:translate-x-5px group-hover:translate-y-5px">
			<img class="m-10 w-4/5 border-black border-2" src={current_article_index_pic} alt="" />
		</div>
	</div></a>
</header>

<style lang="scss">
</style>
