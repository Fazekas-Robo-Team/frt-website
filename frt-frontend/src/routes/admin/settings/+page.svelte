<script lang="ts">
	import { PUBLIC_BACKEND_URL } from "$env/static/public";


    export let data: any;

    let username: string, fullname: string, email:string, description: string, roles: string, password: string;

    let userData = data.userData;

    username = userData.username;
    fullname = userData.fullname;
    email = userData.email;
    description = userData.description;
    roles = userData.roles;

    async function submit() {
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
                password,
            })
        });

        const json = await res.json();

        if (!res.ok) {
            throw Error(json.message);
        }
    }
</script>

<form class="flex flex-col w-1/3 mx-auto my-8" on:submit|preventDefault={submit}>
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

    <button type="submit" class="bg-blue-500 text-white p-2 rounded my-2">Submit</button>
</form>