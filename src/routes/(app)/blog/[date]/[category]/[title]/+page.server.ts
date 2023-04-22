import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals: { supabase } }) => {
    const { date, category, title } = params;

    const slug = `${date}/${category}/${title}`;

    // select the article with the slug
    const { data: article, error } = await supabase.from('articles').select('*, profiles(full_name)').eq('slug', slug);

    if (error) {
        return fail(500, error);
    }

    return {
        article: article?.[0]
    };
}) satisfies PageServerLoad;