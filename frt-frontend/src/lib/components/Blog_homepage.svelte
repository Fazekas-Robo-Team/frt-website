<script>
	import robot from '$lib/images/robot.jpg';
</script>

<div class="fullscreen bg-purple flex flex-center column" id="blog">
	<h1 class="text-white">Blog</h1>
	<div class="cards-wrapper">
		<div class="card">
			<img class="align-left" src={robot} alt="" />
			<div class="content">
				<h4>Bemutatkozik a Vakololapat</h4>
				<p>
					Vilagklasszis csapatmunka, eros karok es jodli. Hogyan valt meghatarozo szereplove egy
					szakmunkaseszkoz?
				</p>
			</div>
		</div>
		<div class="card">
			<img class="align-left" src={robot} alt="" />
			<div class="content">
				<h4>Linux masterrace</h4>
				<p>
					Miert fontos a Windows-shaming egeszes ovodaskortol? Megeri eladni az adatainkat az USA-n
					keresztul Kinanak?
				</p>
			</div>
		</div>
		<div class="card">
			<img class="align-left" src={robot} alt="" />
			<div class="content">
				<h4>Megeri idot fektetni a csapatmunkaba?</h4>
				<p>
					Nem tudjuk, valoszinuleg nem is fogjuk megtudni. De sokkal viccesebb egymast szivatni, ez
					is egy alternativ teambuilding.
				</p>
			</div>
		</div>
	</div>
	<p><a href="" class="btn btn-secondary transition">Összes cikk</a></p>
</div>

<style lang="scss">
	.cards-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 60%;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 20%;
		height: 70%;
		margin: 20px;
		padding: 20px;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		img {
			width: 100%;
			height: 60%;
			object-fit: cover;
			border-radius: 5px;
		}

		.content {
			width: 100%;
			height: 40%;
		}
	}
</style>
