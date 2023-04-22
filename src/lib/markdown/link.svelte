<script lang="ts">
    export let href = '';
    export let title = '';
</script>

<a target="_blank" rel="noreferrer" {href} {title} class="text-blue-500 hover:text-blue-700">
    <slot />
</a>