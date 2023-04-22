<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

    let username = '', password = '', error = '';

    const handleSubmit: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.status !== 200) {
				error = "Invalid username or password.";
			} else {
				if (!('data' in result)) {
					return;
				}
				const { email } = result.data as { email: string };

				const { error: signInError } = await data.supabase.auth.signInWithPassword({
					email: email,
					password
				});

				if (signInError) {
					error = signInError.message;
				} else {
					goto('/admin');
				}
			}
		};
    };

	export let data: PageData;
</script>

<svelte:head>
	<title>FRT Admin | Login</title>
</svelte:head>

<div class="w-screen h-screen flex justify-center items-center bg-purple-800">
	<!-- Login form -->
	<form method="post" action="?/getEmailByUsername" use:enhance={handleSubmit} class="w-full max-w-sm mx-auto bg-white rounded-lg p-8 font-sans">
		<!-- Title -->
		<h2 class="text-2xl font-bold text-center mb-4">Sign in</h2>

		<!-- username input -->
		<div class="mb-4">
			<label class="block text-gray-700 font-bold mb-2" for="username"> Username </label>
			<input
				id="username"
				type="username"
				name="username"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				autocomplete="username"
				bind:value={username}
			/>
		</div>

		<!-- Password input -->
		<div class="mb-4">
			<label class="block text-gray-700 font-bold mb-2" for="password"> Password </label>
			<input
				id="password"
				type="password"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
			<button class="bg-purple-700 hover:brightness-75 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
				Sign in
			</button>
		</div>
	</form>
</div>