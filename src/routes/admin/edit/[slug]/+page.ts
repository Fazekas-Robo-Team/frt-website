import { PUBLIC_BACKEND_URL } from "$env/static/public";

// @ts-ignore
export async function load({ params }) {

    const { slug } = params;

    let postData: any = {};
    
    await fetch(`${PUBLIC_BACKEND_URL}/blog/${slug}`, {
        method: 'GET',
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

    let imageUrls: string[] = [], imageNames: string[] = [];

    if (postData.content) {
        // extract the image names from the content
        imageUrls = postData.content.match(/(?<=\!\[.*\]\()(.+?)(?=\))/g);

        // replace the image paths with the image names
        postData.content = postData.content.replace(/(?<=\!\[.*\]\()(.+?)(?=\))/g, (match: any) => {
            return match.split('/').pop();
        });

        // extract the image names from the content
        imageNames = postData.content.match(/(?<=\!\[.*\]\()(.+?)(?=\))/g);
    }

    return {
        postData,
        slug,
        imageNames,
        imageUrls
    };
}