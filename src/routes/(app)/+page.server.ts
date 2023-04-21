import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
    //const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)').order('created_at', { ascending: true });

    // get the 3 latest, published articles
    const { data: articles, error } = await supabase.from('articles').select('*, profiles(full_name)').eq('published', true).order('created_at', { ascending: false }).limit(3);
    
    // get featured post
    const { data: featured } = await supabase.from('articles').select('*').eq('featured', true);

    if (error) {
        return fail(500, error);
    }

    return {
        articles,
        featured: featured?.[0]
    };
}) satisfies PageServerLoad;