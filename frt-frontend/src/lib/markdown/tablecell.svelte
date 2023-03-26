<script lang="ts">
	export let header: boolean;
</script>

{#if header}
	<th class="px-2"><slot /></th>
{:else}
	<td class="px-2"><slot /></td>
{/if}
