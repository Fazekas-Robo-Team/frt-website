import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load = (async ({ locals: { supabase } }) => {
	// get all users
	const { data: users, error } = await supabase.from('profiles').select('id, full_name, username, description, roles, pfp_url');

	if (error) {
		return fail(500, error);
	}

	return {
		users
	};
}) satisfies PageServerLoad;