<!-- Sidebar.svelte -->
<script lang="ts">
	export let activeItem: string;

	const menuItems = [
		{ name: 'Home', link: '/', active: activeItem === 'Home' },
		{ name: 'New Post', link: '/new-post', active: activeItem === 'New Post' },
		{ name: 'Analytics', link: '/analytics', active: activeItem === 'Analytics' },
		{ name: 'Settings', link: '/settings', active: activeItem === 'Settings' }
	];
</script>

<nav class="flex flex-col w-fit p-4 h-screen py-4 bg-slate-800">
	<div class="flex items-center justify-center mb-8">
		<h1 class="text-2xl font-bold text-white">FRT Admin</h1>
	</div>
	<ul class="space-y-1">
		{#each menuItems as item}
			<li class="py-2 font-medium text-white hover:bg-gray-200 {item.active ? 'bg-gray-200' : ''}">
				<a href={item.link}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>
