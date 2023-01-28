<script lang="ts">
	import type Social from './About.svelte';

	export let title: string = '';
	export let roles: string[] = [];
	export let img: string = 'https://avatars.githubusercontent.com/u/44097962?v=4';
	export let description: string = '';
</script>

<div class="about card {description ? 'long' : ''}">
	<div class="card-header">
		<img src={img} alt="robot" />
	</div>
	<div class="content">
		<h3>{title}</h3>
		{#if description}<p>{description}</p>{/if}
		<h4>
			{#each roles as role}
				<span class="role">{role}</span>
			{/each}
		</h4>
	</div>
</div>

<style lang="scss">
	.card {
		display: flex;
		flex: 1 0 20%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 20%;
		height: fit-content;
		margin: 20px;
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
			width: 100%;
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

	.card.long {
		height: 350px;

		.card-header {
			height: 50%;
			width: 100%;
		}
	}
</style>
