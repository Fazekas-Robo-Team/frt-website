<script lang="ts">
	export let text = '';
	export let depth: number;
</script>

{#if depth === 1}
	<h1 class="text-4xl font-bold mb-2">{text}</h1>
{:else if depth === 2}
	<h2 class="text-3xl font-bold mb-2">{text}</h2>
{:else if depth === 3}
	<h3 class="text-2xl font-bold mb-2">{text}</h3>
{:else if depth === 4}
	<h4 class="text-xl font-bold mb-2">{text}</h4>
{:else if depth === 5}
	<h5 class="text-lg font-bold mb-2">{text}</h5>
{:else if depth === 6}
	<h6 class="text-base font-bold mb-2">{text}</h6>
{/if}
