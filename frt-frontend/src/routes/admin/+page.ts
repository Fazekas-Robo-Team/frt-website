import { PUBLIC_BACKEND_URL } from '$env/static/public';
    

export async function load() {
    let posts: any = [];

	// fetch the posts from the backend (GET /blog)
    await fetch(`${PUBLIC_BACKEND_URL}/blog`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            posts = data.data;
        }
    })

    return {
        posts,
    };
}
