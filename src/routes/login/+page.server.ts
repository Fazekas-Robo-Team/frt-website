// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	
    // if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/admin');
	}

	return { url: url.origin };
};

export const actions = {
	getEmailByUsername: async ({ request, locals: { supabase }}) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;

		const { data: user, error } = await supabase.from('profiles').select('*').eq('username', username).single();

		if (error) {
			return {
				status: 500,
				body: error
			};
		}

		return {
			status: 200,
			email: user?.email
		};
	}
};