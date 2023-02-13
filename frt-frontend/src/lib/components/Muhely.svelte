<script lang="ts">
	import Card from './Card.svelte';
	import Logo from '$lib/images/logo.jpg';

	//TODO: replace with better image
	import Muhely from '$lib/images/muhely.png';
</script>

<div class="w-screen h-fit md:h-screen bg-light-orange border-black border-y-2 flex flex-col items-center px-4 py-24 mb-64" id="muhely">
	<div class="bg-medium-orange px-3 pb-4 h-2 mt-4 mb-8 ml-4"><h1 class="text-black text-4xl font-semibold -mt-6 -ml-2">Műhely</h1></div>
	<div class="w-full h-full flex flex-col-reverse md:flex-row justify-between items-center md:px-10">
		<img class="w-3/5 md:w-1/2 lg:w-2/5 border-black border-2 drop-shadow-xl-black-br mt-8" src={Muhely} alt="" />
		<p class="w-full md:w-2/5 lg:w-1/2 text-2xl font-semibold italic">
			A Fazekas aulájának hátuljában húzodik meg a 115/A terem, amely már évek óta a FRT főhadibázisaként operál. Az évek alatt sikerült egy rendkívül
			fejlett infrastruktúrát kialakítani modern laptopokkal és eszközökkel, de persze mindig van hely az olyan klasszikusoknak, mint amilyen például
			a Mindstorms RCX.
		</p>
	</div>
	<div class="flex flex-col md:flex-row mt-8">
		<a
			href="/eszkozpark"
			class="text-center bg-teal py-4 px-6 border-black border-2 drop-shadow-xl-black-br mx-5 my-5 md:my-0 font-semibold text-lg hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
			>Eszközpark</a
		>
	</div>
</div>
