<script>
    export let text = "";
    export let level = 1;
    let size = "";

    level = 4 - level;

    if (level != 1) {
        // @ts-ignore
        size = level;
    }
</script>

<h1 class="text-{level}xl">
    {text}
</h1>
