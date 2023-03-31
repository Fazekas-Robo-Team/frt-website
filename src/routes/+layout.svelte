<script lang="ts">
	import './styles.css';
	import '../app.scss';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let root: any;

	onMount(() => {
		root = document.getElementsByTagName('html')[0];
		root.classList.add('smoothscroll');
	});

	beforeNavigate(() => {
		root.classList.remove('smoothscroll');
	});

	afterNavigate(() => {
		root.classList.add('smoothscroll');
	});
</script>

<slot></slot>