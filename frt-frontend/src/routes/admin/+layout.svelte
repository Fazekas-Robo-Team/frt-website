<script lang="ts">
	import { onMount } from 'svelte';

	const menuItems = [
		{name: 'Home', link: '/admin' },
		{name: 'New Post', link: '/admin/new' },
		{name: 'Analytics', link: '/admin/analytics' },
		{name: 'Settings', link: '/admin/settings' }
	];

    onMount(() => {
        if (!data.authorized) window.location.href = '/login';
    });

    export let data: any;
</script>

<div class="flex flex-row">
	<nav class="flex flex-col w-fit p-4 h-screen py-4 bg-slate-800">
		<div class="flex items-center justify-center mb-8">
			<h1 class="text-2xl font-bold text-white">FRT Admin</h1>
		</div>
		<ul class="space-y-1">
			{#each menuItems as item}
				<li class="py-2 font-medium text-white hover:text-slate-400">
					<a href={item.link}>{item.name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- dark bg, fit the remaining screen -->
	<div class="bg-slate-900 w-full h-screen">
		<slot />
	</div>
</div>
