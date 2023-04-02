export const prerender = false;
export const ssr = true;

import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function load() {
	return await fetch(`${PUBLIC_BACKEND_URL}/auth/check`, {
		method: 'POST',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.authorized) {
				return {
					authorized: true
				};
			} else {
				return {
					authorized: false
				};
			}
		})
		.catch((error) => {
			return {
				authorized: false
			};
		});
}