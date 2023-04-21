<script lang="ts">
	import type monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';

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
	import { PUBLIC_BACKEND_URL, PUBLIC_IMAGE_URL } from '$env/static/public';
	import { loading, modal } from '../../stores.js';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let title: string,
		source: any,
		author: string,
		description: string,
		category: string,
		showSaved: boolean = false,
		indexDisabled: boolean = false,
		postId: number | null = null;

	let imgForm: HTMLFormElement, indexForm: HTMLFormElement;

	// @ts-ignore
	let divElement: HTMLElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco: {
		editor: any;
		Range: any;
		default?: any;
		Emitter?: typeof monaco.Emitter;
		MarkerTag?: typeof monaco.MarkerTag;
		MarkerSeverity?: typeof monaco.MarkerSeverity;
		CancellationTokenSource?: typeof monaco.CancellationTokenSource;
		Uri?: typeof monaco.Uri;
		KeyCode?: typeof monaco.KeyCode;
		KeyMod?: typeof monaco.KeyMod;
		Position?: typeof monaco.Position;
		Selection?: typeof monaco.Selection;
		SelectionDirection?: typeof monaco.SelectionDirection;
		Token?: typeof monaco.Token;
		languages?: typeof monaco.languages;
	};

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
			value: source,
			language: 'markdown',
			theme: 'vs-dark',
			wordWrap: 'on'
		});

		editor.onDidChangeModelContent((e) => {
			source = editor.getValue();
		});
	});

	const imgUpload: SubmitFunction = () => {
		return async ({ result }) => {
			if (!('data' in result)) {
				return;
			}

			const { message, error } = result.data as { message: string; error: string };

			if (error) {
				modal.set({ shown: true, title: 'Image Upload', content: message });
				return;
			}

			const { fileName, imageUrl } = result.data as { fileName: string; imageUrl: string };

			// show message
			modal.set({ shown: true, title: 'Image Upload', content: message });

			// insert image to editor
			let cursorPosition = editor.getPosition()!;

			if (!cursorPosition) {
				// position should be at the end of the document
				const lastLine = editor.getModel()?.getLineCount();
				if (lastLine) {
					editor.setPosition({ lineNumber: lastLine, column: 1 });
					cursorPosition = editor.getPosition()!;
				}
			}

			const range = new Monaco.Range(cursorPosition.lineNumber, cursorPosition.column, cursorPosition.lineNumber, cursorPosition.column);
			editor.executeEdits('my-source', [
				{
					range,
					text: `![${fileName}](${imageUrl})`
				}
			]);

			// add a new line after the image
			const newLineRange = new Monaco.Range(cursorPosition.lineNumber + 1, 1, cursorPosition.lineNumber + 1, 1);

			editor.executeEdits('my-source', [
				{
					range: newLineRange,
					text: '\n'
				}
			]);
		};
	};

	// create date with format yyyy-mm-dd
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const today = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
</script>

<form class="w-full h-full" method="post" action="?/submit">
	<div class="w-full bg-slate-700 h-fit p-2">
		<form class="inline-block" method="post" action="?/imageUpload" enctype="multipart/form-data" bind:this={imgForm} use:enhance={imgUpload}>
			<label for="file" class="text-white bg-indigo-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 leading-4">Upload Images</label
			>
			<input type="file" id="file" name="file" accept="image/*" hidden on:change={() => imgForm.requestSubmit()} />
		</form>
		<input type="submit" class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 leading-5" value="Save draft">
		{#if showSaved}
			<span class="text-white mx-4">Saved</span>
		{/if}
	</div>
	<div class="flex flex-row h-5/6">
		<div bind:this={divElement} class="h-full w-2/5" />
		<div class="h-full w-2/5 bg-white">
			<article class="mx-4 pt-4 max-h-full leading-8 overflow-auto">
				<h1 class="font-semibold text-3xl mb-2">{title}</h1>
				<div class="flex align-center flex-col mb-8">
					<p>{today}</p>
					<p class="font-semibold">{author}</p>
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
			<div class="flex flex-col w-full p-4">
				<input type="hidden" name="content" bind:value={source} />

				<label for="title" class="text-lg font-semibold text-white">Title</label>

				<input required type="text" autocomplete="off" id="title" name="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={title} />

				<label for="description" class="text-lg font-semibold text-white">Description (max 155 characters)</label>

				<textarea
					maxlength="155"
					autocomplete="off"
					id="description"
					name="description"
					class="border-2 border-gray-300 p-2 rounded my-2 h-32"
					bind:value={description}
				/>

				<label for="category" class="text-lg font-semibold text-white">Category</label>

				<input type="text" autocomplete="off" id="category" name="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={category} />

				<form  method="post" action="?/updateIndex" enctype="multipart/form-data" bind:this={indexForm} class="w-full">
					<label for="index" class="text-lg font-semibold text-white">Index Image</label>
					<input type="file" on:change={() => indexForm.requestSubmit()} id="index" name="file" class="w-full border-2 border-white bg-white p-2 rounded my-2" />
				</form>
			</div>
		</div>
	</div>
</form>
