<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { enhance } from "$app/forms";
	import { modal } from "../../stores";
	import type { ActionData, PageData, SubmitFunction } from "./$types";

	export let data: PageData;

	let { articles } = data;

	function featurePost(id: string) {
		
	}

	const deletePost: SubmitFunction = ({ cancel }) => {
		// create a popup to confirm the delete
		if (confirm("Are you sure you want to perform this action?")) {
			return async ({ result }) => {
				if (result.status !== 200) {
					modal.set({
						shown: true,
						title: "Error",
						content: "There was an error modifying the post.",
					});
				} else {
					modal.set({
						shown: true,
						title: "Success",
						content: "The post was modified successfully.",
					});
				}
				
				articles = result.data.articles;
			};
		} else {
			cancel();
		}
	}
</script>

<!-- iter through the posts reverse -->

{#if articles}
{#each articles as article}
	<form method="post" use:enhance={deletePost}>
		<input type="hidden" name="id" value="{article.id}">
		<div class="bg-slate-50 p-2 rounded flex flex-row items-center justify-between my-8">
			<div>
				<h2 class="m-2 font-semibold">{article.title}</h2>
				<div class="flex flex-row">
					<div class="m-2">
						<p class="text-sm text-gray-500">Post state: {article.published ? "published": "draft"} {article.featured ? "(featured)":""}</p>
						<p class="text-sm text-gray-500">Author: {article.profiles.full_name}</p>
						<p class="text-sm text-gray-500">Date: {article.date}</p>
					</div>
				</div>
			</div>

			<div class="flex flex-row">
				<div class="m-2">
					<button
						formaction="?/feature"
						class="text-sm text-gray-500 bg-blue-500 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Feature</button
					>
				</div>
				<div class="m-2">
					<a href="/admin/edit/{article.id}" class="text-sm text-gray-500 bg-orange-400 px-2 py-1 text-white rounded hover:brightness-75 transition-all"
						>Edit</a
					>
				</div>
				<div class="m-2">
					<button
						formaction="?/delete"
						class="text-sm text-gray-500 bg-red-500 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Delete</button
					>
				</div>
				<div class="m-2">
					<button
						formaction="?/publish"
						class="text-sm text-gray-500 bg-emerald-600 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Publish</button
					>
				</div>
				<div class="m-2">
					<button
						formaction="?/unpublish"
						class="text-sm text-gray-500 bg-cyan-600 px-2 py-1 text-white rounded hover:brightness-75 transition-all">Unpublish</button
					>
				</div>
			</div>
		</div>
	</form>
{/each}
{/if}