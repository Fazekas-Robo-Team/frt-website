<script lang="ts">
	import { PUBLIC_BACKEND_URL, PUBLIC_IMAGE_URL } from '$env/static/public';
	import { loading, modal } from '../../../stores';

	export let data: any;

	let id: number, username: string, fullname: string, email: string, description: string, roles: string, password: string;
	let userData = data.user;
	id = userData.id;
	username = userData.username;
	fullname = userData.full_name;
	email = data.email;
	description = userData.description;
	roles = userData.roles;

	let pfpForm: HTMLFormElement;
</script>
<div class="flex-column w-2/3 mx-auto">
	<h2 class="text-2xl font-bold text-white text-left mb-4">User settings</h2>
	<hr class="text-white">
	<div class="flex flex-row w-full mx-auto my-8">
		<form class="w-2/3" method="post" action="?/update">
			<div class="flex flex-col">
				<label for="full_name" class="text-lg font-semibold text-white">Name</label>
	
				<input type="text" autocomplete="off" id="full_name" name="full_name" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={fullname} />
	
				<label for="username" class="text-lg font-semibold text-white">Username</label>
	
				<input type="text" autocomplete="off" id="username" name="username" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={username} />
	
				<label for="email" class="text-lg font-semibold text-white">Email</label>
	
				<input type="text" autocomplete="off" id="email" name="email" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={email} />
	
				<label for="description" class="text-lg font-semibold text-white">Description</label>
	
				<textarea autocomplete="off" id="description" name="description" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={description} />
	
				<label for="roles" class="text-lg font-semibold text-white">Roles</label>
	
				<input disabled type="text" autocomplete="off" id="roles" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={roles} />
	
				<label for="password" class="text-lg font-semibold text-white">Password</label>
	
				<input type="password" autocomplete="off" id="password" name="password" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={password} />
	
				<button type="submit" class="bg-blue-500 w-fit text-white p-2 px-8 rounded my-2">Save</button>
			</div>
		</form>

		<div class="w-1/4 mx-auto mt-3">
			<img src="{userData.pfp_url}" alt="pfp" />
			<!-- file upload for new pfp -->

			<form method="post" action="?/updatePfp" bind:this={pfpForm} enctype="multipart/form-data">
				<label for="pfp" class="bg-blue-500 text-white p-2 w-fit mt-2 rounded mx-auto block hover:brightness-75 transition-all">Upload photo</label>
				<input type="file" id="pfp" name="pfp" class="hidden" on:change={() => pfpForm.requestSubmit()} />
			</form>
		</div>
	</div>
</div>

