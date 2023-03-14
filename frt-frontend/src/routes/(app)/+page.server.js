import { posts } from '$lib/utils/posts'

export async function load() {
    return {
        posts: posts.slice(0, 3)
    }
}