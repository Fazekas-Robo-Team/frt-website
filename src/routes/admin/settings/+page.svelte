<script lang="ts">
	import { PUBLIC_BACKEND_URL, PUBLIC_IMAGE_URL } from '$env/static/public';
	import { load } from '../../+layout';
	import { loading, modal } from '../../../stores';

	export let data: any;

	let id: number, username: string, fullname: string, email: string, description: string, roles: string, password: string;

	let userData = data.userData;

	id = userData.id;
	username = userData.username;
	fullname = userData.fullname;
	email = userData.email;
	description = userData.description;
	roles = userData.roles;

	async function submitUserSettings() {
		const res = await fetch(`${PUBLIC_BACKEND_URL}/users`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				fullname,
				email,
				description,
				password
			})
		});

		const json = await res.json();

		if (!res.ok) {
			throw Error(json.message);
		}
	}

    async function uploadPfp(e: Event) {
		const file = (e.target as HTMLInputElement).files![0];

		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append('pfp', file);

		loading.set(true);

		const res = await fetch(`${PUBLIC_BACKEND_URL}/users/pfp`, {
			method: 'POST',
			credentials: 'include',
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				loading.set(false);

				modal.set({
					shown: true,
					title: 'Success',
					content: 'Profile picture updated'
				});

				// reload the page
				location.reload();
			}
		})
	}
</script>
<div class="flex-column w-2/3 mx-auto">
	<h2 class="text-2xl font-bold text-white text-left mb-4">User settings</h2>
	<hr class="text-white">
	<div class="flex flex-row w-full mx-auto my-8">
		<form class="w-2/3" on:submit|preventDefault={submitUserSettings}>
			<div class="flex flex-col">
				<label for="title" class="text-lg font-semibold text-white">Name</label>
	
				<input type="text" autocomplete="off" id="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={fullname} />
	
				<label for="description" class="text-lg font-semibold text-white">Username</label>
	
				<input type="text" autocomplete="off" id="description" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={username} />
	
				<label for="content" class="text-lg font-semibold text-white">Email</label>
	
				<input type="text" autocomplete="off" id="content" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={email} />
	
				<label for="category" class="text-lg font-semibold text-white">Description</label>
	
				<textarea autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={description} />
	
				<label for="category" class="text-lg font-semibold text-white">Roles</label>
	
				<input disabled type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={roles} />
	
				<label for="category" class="text-lg font-semibold text-white">Password</label>
	
				<input type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={password} />
	
				<button type="submit" class="bg-blue-500 w-fit text-white p-2 px-8 rounded my-2">Save</button>
			</div>
		</form>

		<div class="w-1/4 mx-auto mt-3">
			<img src="{PUBLIC_BACKEND_URL}/user/{id}/pfp.webp" alt="pfp" />
			<!-- file upload for new pfp -->

			<label for="pfp" class="bg-blue-500 text-white p-2 w-fit mt-2 rounded mx-auto block hover:brightness-75 transition-all">Upload photo</label>
			<input type="file" id="pfp" class="hidden" on:change={uploadPfp} />
		</div>
	</div>
</div>

