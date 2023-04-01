import { getPosts } from '$lib/utils/posts'

export async function load() {

    let posts = await getPosts()

    // find the one with featured: true
    let featured = posts.find((post: { featured: any }) => post.featured)

    return {
        featured,
        posts: posts.slice(0, 3)
    };
}