<script lang="ts">
	import Logo from '$lib/images/logo.webp';
</script>

<div class="h-fit md:h-screen bg-light-purple border-t-2 border-black flex flex-col items-center px-4 py-24" id="rolunk">
	<div class="bg-medium-purple px-3 pb-4 h-2 mt-4 mb-8 ml-4"><h2 class="text-black text-4xl font-semibold -mt-6 -ml-2">Rólunk</h2></div>
	<div class="w-full h-full flex flex-col lg:flex-row justify-center items-center md:px-20 mx-10 lg:mx-15">
		<p class="w-4/5 lg:w-1/3 text-2xl font-semibold">
			A Fazekas RoboTeam a Budapesti Fazekas Mihály Gimnázium 2003-ban indult robotika szakköre. Fiatalabb tagjaink számára évente versenyfelkészítő
			szakkör zajlik, az idősebbek önállóan, illetve egymás mentorálásával készülnek fel a megmérettetésekre. A műhely aktív közössége jelenleg 12
			diákból áll.
		</p>
		<img class="w-3/5 lg:w-1/3 border-black border-2 drop-shadow-xl-black-br mt-8 mx-10 lg:mx-15" src={Logo} alt="Fazekas RoboTeam" />
	</div>
	<div class="flex flex-col md:flex-row mt-8">
		<a
			href="/aktiv_tagok"
			class="text-center bg-pastel-green py-4 px-6 border-black border-2 drop-shadow-xl-black-br mx-5 my-5 md:my-0 font-semibold text-lg hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
			>Aktív tagok</a
		>
		<a
			href="/eredmenyek"
			class="text-center bg-medium-blue py-4 px-6 border-black border-2 drop-shadow-xl-black-br mx-5 my-5 md:my-0 font-semibold text-lg hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px"
			>Eredmények</a
		>
	</div>
</div>
