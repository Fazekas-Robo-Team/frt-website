import { PUBLIC_BACKEND_URL } from "$env/static/public";

export async function load() {
    const res = await fetch(`${PUBLIC_BACKEND_URL}/auth/check`, {
        method: "POST",
        credentials: "include",
    });
    const authorized = await res.json();
    if (!authorized.authorized) {
        return {
            redirect: "/login",
            authorized: false,
        };
    }

    return {
        authorized: true,
    };
}