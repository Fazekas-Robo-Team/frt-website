<script lang="ts">
	import './styles.css';
	import '../app.scss';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate, invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<slot />
