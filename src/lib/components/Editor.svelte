<script lang="ts">
	import MultipleImageUpload from './Multiple_image_upload.svelte';

	import type monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';
	import { remark } from 'remark';

    import Heading from '$lib/markdown/heading.svelte';
	import Link from '$lib/markdown/link.svelte';
	import Blockquote from '$lib/markdown/blockquote.svelte';
	import Codespan from '$lib/markdown/codespan.svelte';
	import Code from '$lib/markdown/code.svelte';
	import Table from '$lib/markdown/table.svelte';
	import Thead from '$lib/markdown/thead.svelte';
	import Tablecell from '$lib/markdown/tablecell.svelte';
	import Image from '$lib/markdown/image.svelte';
	import Paragraph from '$lib/markdown/paragraph.svelte';

	// @ts-ignore
	let divElement: HTMLElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	function removeUnfinishedCodeBlock(markdown: string): string {
		const lines = markdown.split('\n');
		let isCodeBlock = false;
		let newMarkdown = '';
		let codeBlock = '';

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			
			if (isCodeBlock) {
			// Check if this line closes the code block
			if (line.trim() === '```') {
				isCodeBlock = false;
				newMarkdown += codeBlock + '```' + '\n\n';
				codeBlock = '';
			} else {
				codeBlock += line + '\n';
			}
			} else {
			// Check if this line opens a code block
			if (line.trim().startsWith('```')) {
				isCodeBlock = true;
				codeBlock += line + '\n';
			} else {
				newMarkdown += line + '\n';
			}
			}
		}
		
		return newMarkdown;
	}

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divElement, {
			value: ``,
			language: 'markdown',
			theme: 'vs-dark',
			wordWrap: "on"
		});

		editor.onDidChangeModelContent((e) => {
			source = editor.getValue();
		});
	});

	export let title: string,
		source: any,
		description: string,
		category: string,
		submit: any;

	// create date with format yyyy-mm-dd
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const today = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
</script>

<div class="w-full bg-slate-700 h-fit p-2">
	<button class="bg-indigo-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500">Insert Image</button>
	<button class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700">Save Draft</button>
	<span class="text-white mx-4">Saved</span>
</div>
<div class="flex flex-row h-5/6">
	<div bind:this={divElement} class="h-full w-2/5" />
	<div class="h-full w-2/5 bg-white">
		<article class="mx-4 pt-4 max-h-full leading-8 overflow-auto">
			<h1 class="font-semibold text-3xl mb-2">{title}</h1>
			<div class="flex align-center flex-col mb-8">
				<p>{today}</p>
				<p class="font-semibold">Gergely Dániel</p>
			</div>
			{#key source}
			<SvelteMarkdown
				{source}
				renderers={{
					heading: Heading,
					link: Link,
					blockquote: Blockquote,
					codespan: Codespan,
					code: Code,
					table: Table,
					tablehead: Thead,
					tablecell: Tablecell,
					image: Image,
					paragraph: Paragraph
				}}
			/>
			{/key}
		</article>
	</div>
	<div class="min-h-full w-1/5 bg-slate-800">
		<form id="form" class="flex flex-col w-full p-4" on:submit|preventDefault={submit}>
			<label for="title" class="text-lg font-semibold text-white">Title</label>
			
			<input type="text" autocomplete="off" id="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={title} />
		
			<label for="description" class="text-lg font-semibold text-white">Description (max 155 characters)</label>
		
			<textarea autocomplete="off" id="description" class="border-2 border-gray-300 p-2 rounded my-2 h-32" bind:value={description} />
		
			<label for="category" class="text-lg font-semibold text-white">Category</label>
		
			<input type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={category} />

			<label for="index" class="text-lg font-semibold text-white">Index Image</label>
			
			<input type="file" id="index" class="border-2 border-white bg-white p-2 rounded my-2" />

			<button class="bg-blue-500 text-white text-lg font-bold py-2 rounded mt-4 hover:bg-blue-600">Media Manager</button>
		</form>
	</div>
</div>
