<div class="fullscreen flex flex-center column" id="aktualis">
	<h2>Aktuális</h2>
	<div class="card-wrapper">
		<div class="card">
			<div class="content align-left">
				<h2>Indul a 2023-as WRO</h2>
				<p class="text-left">
					Idén 4 csapattal képviselteti magát a Fazekas RoboTeam az egyik legnagyobb nemzetközi
					robotikaversenyen. Két veterán csapat mellett egy újonc senior valamint junior csapat is
					részt vesz majd a versenyen Robomission kategóriában...
				</p>
				<p><a href="" class="btn btn-success mg-2 transition">Olvass tovább</a></p>
			</div>
			<img class="align-right" src="/blog_images/robot.jpg" alt="" />
		</div>
	</div>
</div>

<style lang="scss">
	.card-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 50%;
	}

	.card {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 70%;
		height: 400px;
		margin: 20px;
		padding: 20px;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		img {
			width: 60%;
			height: 100%;
			object-fit: cover;
			border-radius: 5px;
		}
		.content {
			width: 40%;
			height: 100%;
			margin-right: 20px;
		}
	}

	@media only screen and (max-width: 1199px) {
		.card {
			width: 85%;
		}
	}

	@media only screen and (max-width: 1200px) {
		.card {
			img {
				width: 50%;
			}
			
			.content {
				width: 50%;
			}
		}
	}

	@media only screen and (max-width: 992px) {
		.card-wrapper {
			height: fit-content;
		}
		.card {
			flex-direction: column-reverse;
			align-items: center;
			justify-content: center;
			height:	fit-content;
			img {
				width: 100%;
				height: 50%;
			}
			.content {
				width: 100%;
				margin-right: 0;
			}
		}
	}


</style>
