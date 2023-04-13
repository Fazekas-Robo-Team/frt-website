import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase } }) => {
	const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)');

	if (error) {
		return fail(500, error);
	}

	return {
		articles
	};
}) satisfies PageServerLoad;

export const actions = {
	publish: async ({ request, locals: { supabase } }) => {
		const { data: post, error } = await supabase.from('posts').update({ active: true });
		//.eq("id", params.id);

		if (error) {
			return fail(500, error);
		}

		return redirect(303, '/admin/posts');
	}
} satisfies Actions;
