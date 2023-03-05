<script context="module">
    import h1 from "./markdown/h1.svelte";
    import h2 from "./markdown/h2.svelte";
    import h3 from "./markdown/h3.svelte";
    import blockquote from "./markdown/blockquote.svelte";
    import code from "./markdown/code.svelte";

    export { h1, h2, h3, blockquote, code };
</script>

<slot></slot>