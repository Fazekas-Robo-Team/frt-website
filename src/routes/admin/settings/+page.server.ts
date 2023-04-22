import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load = (async ({ locals: { supabase, getSession } }) => {
	// get session
	const session = await getSession();

	// get user data
	const { data: user, error } = await supabase.from('profiles').select('full_name, username, description, roles').eq('id', session?.user.id).single();

	if (error) {
		return fail(500, error);
	}

	return {
		user,
		email: session?.user.email
	};
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const full_name = formData.get('full_name');
		const username = formData.get('username');
		const description = formData.get('description');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string | undefined;

		// update user data
		const session = await getSession();
		const { data: user, error } = await supabase.from('profiles').update({ full_name, username, description }).eq('id', session?.user.id);

		if (error) {
			return fail(500, error);
		}

		let logoutAfterUpdate = false;

		if (email !== session?.user.email) {
			// update user email
			const { error: error2 } = await supabase.auth.updateUser({ email: email });
			
			if (error2) {
				return fail(500, error2 as unknown as Record<string, unknown>);
			}

			logoutAfterUpdate = true;
		}

		if (password) {
			// update user password
			const { error: error3 } = await supabase.auth.updateUser({ password });
			
			if (error3) {
				return fail(500, error3 as unknown as Record<string, unknown>);
			}

			logoutAfterUpdate = true;
		}

		if (logoutAfterUpdate) {
			// log user out
			await supabase.auth.signOut();

			throw redirect(303, '/login');

		}
		
		return {
			"message": "User updated",
			"user": user,
		};
	}
} satisfies Actions;