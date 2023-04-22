import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { supabase } }) => {
    // logout the user
    await supabase.auth.signOut();

    // redirect to login page
    throw redirect(303, "/login");
}) satisfies PageServerLoad;