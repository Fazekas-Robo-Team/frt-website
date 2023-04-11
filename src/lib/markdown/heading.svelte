<script lang="ts">
	export let text = '';
	export let depth: number;
</script>

{#if depth === 1}
	<h2 class="text-4xl font-bold mb-4">{text}</h2>
{:else if depth === 2}
	<h3 class="text-3xl font-bold mb-4">{text}</h3>
{:else if depth === 3}
	<h4 class="text-2xl font-bold mb-4">{text}</h4>
{/if}