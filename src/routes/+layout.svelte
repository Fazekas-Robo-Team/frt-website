<script lang="ts">
	import './styles.css';
	import '../app.scss';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

</script>

<slot></slot>