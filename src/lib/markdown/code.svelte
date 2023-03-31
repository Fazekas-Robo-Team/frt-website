<script lang="ts">
    import Prism from "prismjs";

    export let lang = '';
    export let text = '';

    if (lang == '') {
        lang = 'js';
    }
</script>

<pre class="bg-slate-200 px-2 py-0.5 mb-4 rounded"><code class="bg-slate-200">{@html Prism.highlight(text, Prism.languages[lang], lang)}</code></pre>