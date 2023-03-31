<script lang="ts">
    export let href = '';
    export let title = '';
</script>

<a {href} {title} class="text-blue-500 hover:text-blue-700">
    <slot />
</a>