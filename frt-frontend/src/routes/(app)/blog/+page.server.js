import { posts } from '$lib/utils/posts'

// @ts-ignore
export async function load() {
    return {
        posts: posts
    }
}