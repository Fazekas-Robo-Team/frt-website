import { posts } from '$lib/utils/posts'

// @ts-ignore
export async function load({ params }) {

    const post = posts.find(post => post.slug === params.slug)

    return {
        post: post
    }
}