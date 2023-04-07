<script lang="ts">
	import Prism from 'prismjs';

	export let lang = '';
	export let text = '';

	if (lang == '') {
		lang = 'js';
	}
	let highlighted: any;
	try {
		highlighted = Prism.highlight(text, Prism.languages[lang], lang);
	} catch (error) {
		highlighted = text;
	}
</script>

<pre class="bg-slate-200 px-2 py-0.5 mb-4 rounded"><code class="bg-slate-200">{@html highlighted}</code></pre>
