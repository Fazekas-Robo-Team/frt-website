import { PUBLIC_BACKEND_URL } from "$env/static/public";

export async function load() {
    // load posts from backend
    const res = await fetch(`${PUBLIC_BACKEND_URL}/blog/`, {
        method: "GET",
        credentials: "include",
    });
    const posts = await res.json();

    return {
        posts,
    };
}
