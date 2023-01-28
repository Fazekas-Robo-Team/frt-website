<script lang="ts" context="module">
	export interface Social {
		url: string;
		icon: string;
	}

	export interface Card_data {
		title: string;
		image: string;
		roles: string[];
		socials: string[];
        description?: string;
	}   
</script>

<script lang="ts">
	import Card from './Card.svelte';
	import Popup from './Popup.svelte';
	import { popup_shown } from './stores';

	let title: string;
	let cards: Card_data[] = [];

	function active_members_open() {
		popup_shown.set(true);
		title = 'Aktív tagok';
		cards = [
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			},
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			},
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			},
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			},
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			},
			{
				title: 'Kovács Bence',
				image: 'https://avatars.githubusercontent.com/u/44097962?v=4',
				roles: ['Mentor', 'Webfejlesztő'],
				socials: [],
                description: ''
			}
		];
	}

	function workstuff_open() {
		popup_shown.set(true);
		title = 'Mikkel dolgozunk?';
		cards = [
			{
				title: 'LEGO Mindstorms EV3',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lego-mindstorms-ev3.jpg',
                roles: [],
				socials: [],
                description: 'A legó robotokat a legó mindstorms EV3-ak keltik életre.'
			},
            {
				title: 'LEGO Mindstorms NXT',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lego-mindstorms-ev3.jpg',
                roles: [],
				socials: [],
                description: 'Bár a legó mindstorms NXT már nem gyártott, alkalmanként még használjuk.'
			},
            {
				title: 'REV Robotics',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lego-mindstorms-ev3.jpg',
                roles: [],
				socials: [],
                description: 'A REV Robotics készletet a legó technikai elemek helyett alumínium elemeket használó robotok építésére használjuk.'
			},
            {
                title: 'Lenovo ThinkPad L15',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lego-mindstorms-ev3.jpg',
                roles: [],
                socials: [],
                description: 'A muhelyünkben jelenleg Lenovo ThinkPad L15 laptopokat használunk, Arch Linux operációs rendszerrel.'
            },
            {
                title: 'Acer Aspire 5',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lego-mindstorms-ev3.jpg',
                roles: [],
                socials: [],
                description: 'A Lenovo ThinkPad L15-os laptopok mellett 3 Acer Aspire 5 laptopok is vannak a muhelyunkben, szintén Arch Linux operációs rendszerrel.'

            },
		];
	}
</script>

<div class="fullscreen flex flex-center" id="about">
	<div class="content mg-6">
		<h1>Bemutatkozunk</h1>
		<h3>
			A Fazekas RoboTeam egy 2003-ban indult robotika szakkör a Fazekas Mihály Gimnáziumban. A
			szakkörökön elsősorban legórobotokkal és a REV Robotics készlettel foglalkozunk, emellett
			közösségként segítjük és támogatjuk egymást az informatika más területein is.
		</h3>
		<div class="flex row flex-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p class="btn btn-primary transition mg-1" on:click={active_members_open}>Aktív tagok</p>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p class="btn btn-secondary transition mg-1" on:click={workstuff_open}>
				Mikkel dolgozunk?
			</p>
		</div>
	</div>
	<Popup title={title} {cards} />
</div>
