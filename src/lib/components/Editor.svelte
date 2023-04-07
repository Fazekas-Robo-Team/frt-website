<script lang="ts">
	import { index } from './../../../.svelte-kit/output/server/nodes/3.js';
	import MultipleImageUpload from './Multiple_image_upload.svelte';

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
	import { loading } from '../../stores.js';

	// @ts-ignore
	let divElement: HTMLElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco: { editor: any; Range: any; default?: any; Emitter?: typeof monaco.Emitter; MarkerTag?: typeof monaco.MarkerTag; MarkerSeverity?: typeof monaco.MarkerSeverity; CancellationTokenSource?: typeof monaco.CancellationTokenSource; Uri?: typeof monaco.Uri; KeyCode?: typeof monaco.KeyCode; KeyMod?: typeof monaco.KeyMod; Position?: typeof monaco.Position; Selection?: typeof monaco.Selection; SelectionDirection?: typeof monaco.SelectionDirection; Token?: typeof monaco.Token; languages?: typeof monaco.languages; };

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

	function handleImageUpload(event: Event) {
		loading.set(true);

		submit();

		const file = (event.target as HTMLInputElement)?.files?.[0];
		if (file) {
			// send file to server upload_image endpoint
			const formData = new FormData();
			formData.append('image', file);

			fetch(`${PUBLIC_BACKEND_URL}/blog_admin/upload_image/${postId}`, {
				method: 'POST',
				credentials: 'include',
				body: formData
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						loading.set(false);

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
								text: `![${data.filename}](${data.filename})`
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
					}
				})
		}
	}

	// create date with format yyyy-mm-dd
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const today = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;


	export let title: string, source: any, description: string, category: string, submit: any, showSaved: boolean = false, indexDisabled: boolean = false, postId: number|null = null;
</script>

<div class="w-full bg-slate-700 h-fit p-2">
	<label for="fileInput" class="text-white bg-indigo-500 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 leading-4">Upload Images</label>
	<input type="file" id="fileInput" accept="image/*" hidden on:change={handleImageUpload}/>
	<button class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 leading-5" on:click={submit}>Save Draft</button>
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
		<form id="form" class="flex flex-col w-full p-4">
			<label for="title" class="text-lg font-semibold text-white">Title</label>

			<input required type="text" autocomplete="off" id="title" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={title} />

			<label for="description" class="text-lg font-semibold text-white">Description (max 155 characters)</label>

			<textarea required maxlength="155" autocomplete="off" id="description" class="border-2 border-gray-300 p-2 rounded my-2 h-32" bind:value={description} />

			<label for="category" class="text-lg font-semibold text-white">Category</label>

			<input required type="text" autocomplete="off" id="category" class="border-2 border-gray-300 p-2 rounded my-2" bind:value={category} />

			<label for="index" class="text-lg font-semibold text-white">Index Image</label>

			<input disabled={indexDisabled ? true : false} type="file" id="index" class="border-2 border-white bg-white p-2 rounded my-2" />
		</form>
	</div>
</div>
