<script lang="ts">
	import Card from './Card.svelte';
	import { popup_shown } from '../../routes/stores';
	import Logo from '$lib/images/logo.jpg';

	//TODO: replace with better image
	import Muhely from '$lib/images/muhely.png';
</script>

<div class="w-screen h-fit md:h-screen bg-light-purple border-t-2 border-black flex flex-col items-center px-4 py-24" id="rolunk">
	<div class="bg-medium-purple px-3 pb-4 h-2 mt-4 mb-8 ml-4"><h1 class="text-black text-4xl font-semibold -mt-6 -ml-2">Rólunk</h1></div>
	<div class="w-full h-full flex flex-col md:flex-row justify-between items-center md:px-20">
		<p class="w-full md:w-1/2 text-2xl font-semibold">
			A Fazekas RoboTeam egy 2003-ban indult robotika szakkör a Fazekas Mihály Gimnáziumban. A szakkörökön elsősorban legórobotokkal és a REV Robotics
			készlettel foglalkozunk, emellett közösségként segítjük és támogatjuk egymást az informatika más területein is.
		</p>
		<img class="w-2/3 md:w-1/4 lg:1/5 border-black border-2 drop-shadow-xl-black-br mt-8" src={Logo} alt="" />
	</div>
	<div class="flex flex-col md:flex-row mt-8">
		<a
			href="/aktiv_tagok"
			class="text-center bg-green py-4 px-6 border-black border-2 drop-shadow-xl-black-br mx-5 my-5 md:my-0 font-semibold text-lg hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
			>Aktív tagok</a
		>
		<a
			href="/eredmenyek"
			class="text-center bg-medium-blue py-4 px-6 border-black border-2 drop-shadow-xl-black-br mx-5 my-5 md:my-0 font-semibold text-lg hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
			>Eredmények</a
		>
	</div>
</div>