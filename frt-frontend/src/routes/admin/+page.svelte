<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { modal, loading } from '../../stores';

	export let data: any;

	let posts = data.posts;

	export async function fetcher() {
		let posts: any = [];
		// fetch the posts from the backend (GET /blog)
		await fetch(`${PUBLIC_BACKEND_URL}/blog`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					posts = data.data;
				}
			});

		return posts;
	}

	async function activatePost(id: number) {
		loading.set(true);
		// call the api to activate the post
		// if successful, show a modal

		await fetch(`${PUBLIC_BACKEND_URL}/blog/publish/${id}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((res) => {
				loading.set(false);
				if (res.success) {
					// show a modal
					modal.set({
						shown: true,
						title: 'Success',
						content: 'Post published'
					});
				} else {
					// show a modal
					modal.set({
						shown: true,
						title: 'Error',
						content: 'Post could not be published'
					});
				}
			});
		posts = await fetcher();
	}

	async function deactivatePost(id: number) {
		loading.set(true);

		await fetch(`${PUBLIC_BACKEND_URL}/blog/deactivate/${id}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((res) => {
				loading.set(false);
				if (res.success) {
					// show a modal
					modal.set({
						shown: true,
						title: 'Success',
						content: 'Post deactivated'
					});
				} else {
					// show a modal
					modal.set({
						shown: true,
						title: 'Error',
						content: 'Post could not be deactivated'
					});
				}
			});

	    posts = await fetcher();
    
	}

	async function deletePost(id: number) {
		loading.set(true);

		await fetch(`${PUBLIC_BACKEND_URL}/blog/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((res) => {
				loading.set(false);
				if (res.success) {
					// show a modal
					modal.set({
						shown: true,
						title: 'Success',
						content: 'Post deleted'
					});
				} else {
					// show a modal
					modal.set({
						shown: true,
						title: 'Error',
						content: 'Post could not be deleted'
					});
				}
			});
        
        posts = await fetcher();
	}
</script>

<!-- iter through the posts -->

{#each posts as post}
	<div class="bg-slate-50 p-2 rounded flex flex-row items-center justify-between my-8">
		<div>
			<h2 class="m-2 font-semibold">{post.title}</h2>
			<div class="flex flex-row">
				<div class="m-2">
					<p class="text-sm text-gray-500">Post state: {post.state}</p>
					<p class="text-sm text-gray-500">Author: {post.author}</p>
					<p class="text-sm text-gray-500">Date: {post.date}</p>
				</div>
			</div>
		</div>

		<div class="flex flex-row">
			<div class="m-2">
				<button
					on:click={() => activatePost(post.id)}
					class="text-sm text-gray-500 bg-orange-400 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Edit</button
				>
			</div>
			<div class="m-2">
				<button
					on:click={() => deletePost(post.id)}
					class="text-sm text-gray-500 bg-red-500 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Delete</button
				>
			</div>
			<div class="m-2">
				<button
					on:click={() => activatePost(post.id)}
					class="text-sm text-gray-500 bg-emerald-600 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Publish</button
				>
			</div>
			<div class="m-2">
				<button
					on:click={() => deactivatePost(post.id)}
					class="text-sm text-gray-500 bg-cyan-600 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Deactivate</button
				>
			</div>
		</div>
	</div>
{/each}
