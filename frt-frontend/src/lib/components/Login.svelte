<script lang="ts">
	import { onMount } from 'svelte';
	import { backend_url } from '../../routes/stores';
	import { get, writable } from 'svelte/store';

	onMount(() => {
		console.log('Login component mounted');
	});

	let username: string;
	let password: string;

	function login() {
		fetch(`${get(backend_url)}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
			.then((res) => res.status)
			.then((data) => {
				console.log(data);
			});
	}
</script>

<div class="container">
	<div class="form">
		<label>
			Username
			<input type="text" bind:value={username} />
		</label>
		<label>
			Password
			<input type="password" bind:value={password} />
		</label>
		<input type="button" on:click={login} value="Login" />
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.form {
		background-color: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		label {
			display: block;
			margin-bottom: 1rem;
		}

		input[type='text'],
		input[type='password'] {
			box-sizing: border-box;
			width: 100%;
			padding: 0.5rem;
			margin-bottom: 1rem;
			border-radius: 0.25rem;
			border: 1px solid lightgray;
		}

		input[type='button'] {
			width: 100%;
			padding: 0.75rem;
			background-color: rgb(48, 104, 207);
			color: white;
			border: none;
			border-radius: 0.25rem;
			font-size: 1.25rem;
			transition: 0.5s;

			&:hover {
				filter: brightness(0.8);
			}
		}
	}
</style>
