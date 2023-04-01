import { PUBLIC_BACKEND_URL } from "$env/static/public";

// @ts-ignore
export async function load({ params }) {

    const { slug } = params;

    let postData: any = {};
    
    await fetch(`${PUBLIC_BACKEND_URL}/blog/${slug}`, {
        method: 'GET',
        mode: 'no-cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            postData = data.data;
        }
    });

    return {
        postData,
        slug
    };
}