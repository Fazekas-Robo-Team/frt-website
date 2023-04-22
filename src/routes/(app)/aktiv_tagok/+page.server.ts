import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

type UserRole = 'Szakkörvezető' | 'Senior Műhelytag' | 'Műhelytag';

export const load = (async ({ locals: { supabase } }) => {
	// get all users
	const { data: users, error } = await supabase.from('profiles').select('id, full_name, username, description, roles, pfp_url');

	// sort like this
	// users whose has role "Szakkörvezető" should be first
	// users whose has role "Senior Műhelytag" should be second
	// users whose has role "Műhelytag" should be third
	// othervise sort by description is not null, then by full_name

	users?.sort((a, b) => {
		const rolePriority: { [key in UserRole]: number } = {
			Szakkörvezető: 1,
			'Senior Műhelytag': 2,
			Műhelytag: 3
		};

		const aRolePriority = Math.min(...a.roles.map((role: UserRole) => rolePriority[role]));
		const bRolePriority = Math.min(...b.roles.map((role: UserRole) => rolePriority[role]));

		if (aRolePriority !== bRolePriority) {
			return aRolePriority - bRolePriority;
		}

		const aDescriptionPriority = a.description !== null ? 1 : 2;
		const bDescriptionPriority = b.description !== null ? 1 : 2;

		if (aDescriptionPriority !== bDescriptionPriority) {
			return aDescriptionPriority - bDescriptionPriority;
		}

		return a.full_name.localeCompare(b.full_name);
	});

	if (error) {
		return fail(500, error);
	}

	return {
		users
	};
}) satisfies PageServerLoad;
