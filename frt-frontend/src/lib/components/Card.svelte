<script lang="ts">
	import type Social from './About.svelte';

	export let title: string = '';
	export let roles: string[] = [];
	export let img: string = 'https://avatars.githubusercontent.com/u/44097962?v=4';
</script>

<div class="card">
	<div class="flex-1">
		<div class="card-header">
			<img src={img} alt="robot" />
		</div>
		<div class="content flex column">
			<div>
				<h3>{title}</h3>
				<h4>
					{#each roles as role}
						<span class="role">{role}</span>
					{/each}
				</h4>
			</div>
		</div>
	</div>
	
	<p class="flex-1">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
</div>

<style lang="scss">
	.card {
		display: flex;
		align-items: center;
		justify-content: center;
		height: fit-content;
		width: 100%;
		margin: 12px 50px;
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;

		.card-header {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
		}

		img {
			width: 50%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			border-radius: 5px;
		}

		.content {
			width: 100%;
			height: 50%;
			text-align: center;
            
			.content h3 {
				font-size: 1.3rem;
				font-weight: 700;
				margin: 5px 0;
			}

			.content h4 {
				font-size: 1.2rem;
				font-weight: 500;
				margin: 0;
			}

			.role {
				font-size: 0.8rem;
				background-color: rgb(90, 66, 179);
				color: #fff;
				border-radius: 5px;
				padding: 5px;
				margin: 0 3px;
			}
		}
		
	}
</style>
