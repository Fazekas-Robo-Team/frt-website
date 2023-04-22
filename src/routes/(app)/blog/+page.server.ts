import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// @ts-ignore
export const load = (async ({locals: { supabase }}) => {
    const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)').eq('published', true).order('date', { ascending: false });

    if (error) {
        return fail(500, error);
    }

    return {
        articles
    };
}) satisfies PageServerLoad;