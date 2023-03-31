import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function load() {
	let userData: any = {};

	await fetch(`${PUBLIC_BACKEND_URL}/users`, {
		method: 'GET',
        credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then((res) => res.json())
	.then((data) => {
		if (data.success) {
			userData = data.data;
		}
	});

	return {
		userData
	};
}
