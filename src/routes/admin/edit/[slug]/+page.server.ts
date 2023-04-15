import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase }}) => {
    const { slug } = params;

    const { data: article, error } = await supabase.from('articles').select('*, profiles(full_name)').eq('id', slug);

    if (error) {
        return fail(500, error);
    }

    return {
        article: article?.[0]
    };
}) satisfies PageServerLoad;