<script lang="ts">
	import './popup.css';
	import Card from './Card.svelte';
	import { popup_shown } from './stores';
	import type { Card_data, Social } from './About.svelte';
	import { onMount } from 'svelte';

	let visible = false;
	export let title: string;
	export let cards: Card_data[];

	onMount(() => {
		popup_shown.subscribe((value) => {
			if (value == true) {
				visible = true;
				document.getElementsByTagName('html')[0].style.overflow = 'hidden';
			} else {
				visible = false;
				document.getElementsByTagName('html')[0].style.overflow = 'unset';
			}
		});
	});

	function popup_click(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.classList.contains('popup')) {
			popup_shown.set(false);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="popup {visible ? '' : 'hidden'}" on:click={popup_click}>
	<div class="popup-content">
		<div class="popup-content-wrapper">
			<h1>{title}</h1>
			<div class="popup-body">
				<div class="flex row justify-center card-wrapper">
					{#each cards as card}
						<Card
							title={card.title}
							img={card.image}
							roles={card.roles}
							description={card.description}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
