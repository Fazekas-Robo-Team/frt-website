import { getPosts } from '$lib/utils/posts'

export async function load() {

    let posts = await getPosts()

    return {
        posts: posts.slice(0, 3)
    }
}