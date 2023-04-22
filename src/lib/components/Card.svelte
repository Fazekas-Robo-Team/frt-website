<script lang="ts" context="module">
	interface User {
		full_name: string;
		roles: string[];
		description: string;
		pfp_url: string;
	}
</script>

<script lang="ts">
	export let user: User;
</script>

<div class="w-full h-fit flex flex-col md:flex-row my-8 bg-white border-black border-2 drop-shadow-xl-black-br">
	<div class="md:w-1/3 md:mb-4 flex flex-col justify-center items-center">
		<img class="w-2/5 md:w-4/5 xl:w-3/5 mt-4 border-black border-2" src="{user.pfp_url}" alt={user.full_name}/>
		<div class="flex flex-col items-center justify-center m-2">
			<p class="font-semibold text-2xl mb-2">{user.full_name}</p>
			<h4>
				{#each user.roles as role}
					<span class="border-black bg-white border-2 m-2 p-1 drop-shadow-md-purple-br whitespace-nowrap">{role}</span>
				{/each}
			</h4>
		</div>
	</div>
	<p class="m-4 md:w-2/3">
		{#if user.description}
		{user.description}
		{/if}
	</p>
</div>
