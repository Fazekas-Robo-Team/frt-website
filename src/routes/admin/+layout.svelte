<script lang="ts">
	import AdminModal from '$lib/components/Admin_modal.svelte';
	import { onMount } from 'svelte';
	import { load } from '../+layout';
	import { modal, loading } from '../../stores';

	let activeMenu = 'Posts';

	const menuItems = [
		{ name: 'Posts', link: '/admin' },
		{ name: 'New Post', link: '/admin/new' },
		{ name: 'Analytics', link: '/admin/analytics' },
		{ name: 'Settings', link: '/admin/settings' }
	];

	onMount(() => {
		// get the active menu item from the url
		const url = window.location.href;

		// / -> posts
		// /new -> new post
		// /analytics -> analytics
		// /settings -> settings

		if (url.includes('/new')) activeMenu = 'Article Editor';
		if (url.includes('/analytics')) activeMenu = 'Analytics';
		if (url.includes('/settings')) activeMenu = 'Settings';
		if (url.includes('/edit')) activeMenu = 'Article Editor';
	});

	function menuClick(event: Event) {
		activeMenu = (event.target as HTMLElement).innerText;
	}

	function logout() {
		// delete all cookies
		document.cookie.split(';').forEach((c) => {
			document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
		});
	}

	// modal
	let modalData = {
		shown: false,
		title: '',
		content: ''
	};

	modal.subscribe((value) => {
		modalData = value;

		setTimeout(() => {
			modalData.shown = false;
		}, 4000);
	});

	let isLoading = false;

	loading.subscribe((value) => {
		isLoading = value;
	});

	export let data: any;
</script>

<svelte:head>
	<title>Admin | FRT</title>
</svelte:head>

{#if modalData.shown}
	<AdminModal modalTitle={modalData.title} modalText={modalData.content} />
{/if}

<!-- loading animation -->
{#if isLoading}
	<div class="fixed flex flex-col items-center justify-center h-screen w-screen bg-slate-700 opacity-50">
		<div class="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
	</div>
{/if}

<div class="flex flex-row font-sans">
	<nav class="flex flex-col w-fit p-4 h-screen py-4 bg-slate-800">
		<div class="flex items-center justify-center mb-8">
			<h1 class="text-2xl font-bold text-white">FRT Admin</h1>
		</div>
		<ul class="space-y-1 list-none">
			{#each menuItems as item}
				<li class="py-2 font-medium text-white hover:text-slate-400">
					<a href={item.link} on:click={menuClick}>{item.name}</a>
				</li>
			{/each}
			<li class="py-2 font-medium text-white hover:text-slate-400">
				<a href="/login" on:click={logout}>Logout</a>
			</li>
		</ul>
	</nav>

	<!-- dark bg, fit the remaining screen -->
	<div class="bg-slate-900 w-full h-screen p-8 overflow-auto">
		<h1 class="text-2xl font-bold text-white text-center mb-4">{activeMenu}</h1>
		<slot />
	</div>
</div>
<slot></slot>