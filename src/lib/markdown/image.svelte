<script>
	import { PUBLIC_IMAGE_URL } from "$env/static/public";

	export let href = '';
	export let title = '';
	export let text = '';
</script>

<img class="w-3/4 mx-auto" src="{PUBLIC_IMAGE_URL}/{href}" {title} alt={text} />
