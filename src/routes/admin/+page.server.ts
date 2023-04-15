import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)').order('created_at', { ascending: true });

	if (error) {
		return fail(500, error);
	}

	return {
		articles
	};
}) satisfies PageServerLoad;

export const actions = {
	publish: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { data: post, error } = await supabase.from('articles').update({ published: true }).eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		}
	},

	unpublish: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is featured, don't unpublish it
		const { data: featured } = await supabase.from('articles').select('featured').eq('id', id);

		if (featured?.[0].featured) {
			return fail(500, "Post must be unfeatured before it can be unpublished");
		}

		const { data: post, error } = await supabase.from('articles').update({ published: false }).eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		}
	},

	feature: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is not published, don't feature it
		const { data: published } = await supabase.from('articles').select('published').eq('id', id);

		if (!published?.[0].published) {
			return fail(500, "Post must be published before it can be featured");
		}

		// set all other posts to false
		await supabase.from('articles').update({ featured: false }).neq('id', id);

		// set this post to true
		const { data: post, error } = await supabase.from('articles').update({ featured: true }).eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		}
	},

	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is featured, don't delete it
		const { data: featured } = await supabase.from('articles').select('featured').eq('id', id);

		if (featured?.[0].featured) {
			return fail(500, "Post must be unfeatured before it can be deleted");
		}

		const { data: post, error } = await supabase.from('articles').delete().eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		}
	}	
} satisfies Actions;
