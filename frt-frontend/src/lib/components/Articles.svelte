<script lang="ts">
    import { onMount } from 'svelte';

    export let message: string;

    onMount(() => {
        console.log('Login component mounted');
    });
</script>

