import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)').order('created_at', { ascending: false });

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
		// get id, title, and category from form data
		const id = formData.get('id');

		// get post from database
		const { data: article } = await supabase.from('articles').select('title, category').eq('id', id);

		// generate date string
		const date = new Date().toISOString().split('T')[0];

		// generate a slug with this format: yyyy_mm_dd(current date)/category/title (replace accented characters with non-accented characters and spaces with underscores)
		const slug = `${date.replace(/-/g, '_')}/${article?.[0].category}/${article?.[0].title.replace(/\s/g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`

		const { data: post, error } = await supabase.from('articles').update({ published: true, slug: slug, date: date }).eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		};
	},

	unpublish: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is featured, don't unpublish it
		const { data: featured } = await supabase.from('articles').select('featured').eq('id', id);

		if (featured?.[0].featured) {
			return fail(500, 'Post must be unfeatured before it can be unpublished' as unknown as Record<string, unknown>);
		}

		const { data: post, error } = await supabase.from('articles').update({ published: false }).eq('id', id);

		if (error) {
			return fail(500, error);
		}

		return {
			post
		};
	},

	feature: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is not published, don't feature it
		const { data: published } = await supabase.from('articles').select('published').eq('id', id);

		if (!published?.[0].published) {
			return fail(500, 'Post must be published before it can be featured' as unknown as Record<string, unknown>);
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
		};
	},

	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		// if the post is featured, don't delete it
		const { data: featured } = await supabase.from('articles').select('featured').eq('id', id);

		if (featured?.[0].featured) {
			return fail(500, 'Post must be unfeatured before it can be deleted' as unknown as Record<string, unknown>);
		}

		const { data: post, error } = await supabase.from('articles').delete().eq('id', id);

		if (error) {
			return fail(500, error);
		}

		// get all posts
		const { data: articles } = await supabase.from('articles').select('*, profiles(full_name)').order('created_at', { ascending: false });

		return {
			articles
		};
	}
} satisfies Actions;
