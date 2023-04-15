import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession }}) => {
    // create a new article with title: "Draft by {user}"

    // redirect to the edit page for the new article

    // get the user id from the session

    const session = await getSession();

    if (!session) {
        return fail(500, "You must be logged in to create a new article");
    }

    // get the user full_name from the profiles table
    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', session.user.id);


    const { data:article, error } = await supabase.from('articles').insert({
        title: `Draft by ${profile?.[0].full_name}`,
        author_id: session.user.id,
    }).select();

    if (error) {
        return fail(500, error);
    }

    throw redirect(303, `/admin/edit/${article?.[0].id}`);

}) satisfies PageServerLoad;