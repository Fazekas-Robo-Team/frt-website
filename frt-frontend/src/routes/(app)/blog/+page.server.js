import { getPosts } from '$lib/utils/posts'

// @ts-ignore
export async function load() {
    return {
        posts: getPosts()
    }
}