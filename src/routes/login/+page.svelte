<script lang="ts">
	// Import dependencies
	import { onMount } from 'svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

	// Declare variables
	let username = '';
	let password = '';
	let error = '';

	// Handle form submit
	const handleSubmit = (event: Event) => {
		event.preventDefault();

		// Validate form fields
		if (!username) {
			error = 'Please enter a valid username';
			return;
		}
		if (!password) {
			error = 'Please enter a password';
			return;
		}

		// Submit form

        fetch(PUBLIC_BACKEND_URL + '/auth/login', {
            method: 'POST',
			mode: 'no-cors',
			credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                error = data.error;
            } else {				
				window.location.href = '/admin';
            }
        })
	};

	// Lifecycle hook
	onMount(() => {
		// Set focus on username input on page load
		document.getElementById('username-input')?.focus();

		if (data.authorized) window.location.href = '/admin';
	});

	export let data: any;
</script>

{#if !data.loggedIn}
<div class="w-screen h-screen flex justify-center items-center">
	<!-- Login form -->
	<form on:submit={handleSubmit} class="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-8 font-sans">
		<!-- Title -->
		<h2 class="text-2xl font-bold text-center mb-4">Sign in</h2>

		<!-- Username input -->
		<div class="mb-4">
			<label class="block text-gray-700 font-bold mb-2" for="username-input"> Username </label>
			<input
				id="username-input"
				type="username"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Username"
				autocomplete="username"
				bind:value={username}
			/>
		</div>

		<!-- Password input -->
		<div class="mb-4">
			<label class="block text-gray-700 font-bold mb-2" for="password-input"> Password </label>
			<input
				id="password-input"
				type="password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Password"
				autocomplete="new-password"
				bind:value={password}
			/>
		</div>

		<!-- Error message -->
		{#if error}
			<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
				<p class="font-bold">Error</p>
				<p>{error}</p>
			</div>
		{/if}

		<!-- Submit button -->
		<div class="flex items-center justify-between">
			<button class="bg-blue-600 hover:brightness-75 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
				Sign in
			</button>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"> Forgot password? </a>
		</div>
	</form>
</div>
{/if}