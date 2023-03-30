<script>
	import { PUBLIC_BACKEND_URL } from "$env/static/public";

	export let href = '';
	export let title = '';
	export let text = '';
</script>

<img class="w-3/4 mx-auto" src="{PUBLIC_BACKEND_URL}/{href}" {title} alt={text} />
