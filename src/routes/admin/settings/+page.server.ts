import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import sharp from "sharp";

export const load = (async ({ locals: { supabase, getSession } }) => {
	// get session
	const session = await getSession();

	// get user data
	const { data: user, error } = await supabase.from('profiles').select('full_name, username, description, roles, pfp_url').eq('id', session?.user.id).single();

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
	},

	updatePfp: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		const formData = await request.formData();
		const pfp = formData.get('pfp') as File;

		console.log(pfp);

		if (!pfp) return fail(500, 'No file uploaded' as unknown as Record<string, unknown>)

		// create a fileName const with .webp extension
		
		const fileName = `${pfp.name.split('.')[0]}.webp`;

		const buffer = await pfp.arrayBuffer();

		const webpBuffer = await sharp(buffer).resize({width:800, height:800, fit:"contain"}).webp().toBuffer();
		
		// create a webp file
		const webp = new File([webpBuffer], fileName, { type: 'image/webp' });

		const { data: image, error } = await supabase.storage.from('user_images').upload(`${session?.user.id}/${fileName}`, webp, {upsert: true});

		console.log(image, error);

		// get the image url
		const { data: imageUrl } = await supabase.storage.from('user_images').getPublicUrl(`${session?.user.id}/${fileName}`);

		if (error) {
			if ('statusCode' in error) {
				if (error.statusCode == 409) {
					// image already exists
					return {
						"message": "Image already uploaded",
						"fileName": fileName,
						"imageUrl": imageUrl.publicUrl
					}
				}
			}
			return {
				"message": "Image upload failed",
				"error": error
			}
		}

		// update user data
		const { data: user, error: error2 } = await supabase.from('profiles').update({ pfp_url: imageUrl.publicUrl }).eq('id', session?.user.id);

		if (error2) {
			return fail(500, error2 as unknown as Record<string, unknown>);
		}

		return {
			"message": "Image uploaded",
			"fileName": fileName,
			"imageUrl": imageUrl.publicUrl,
			"user": user
		};
	}		
} satisfies Actions;