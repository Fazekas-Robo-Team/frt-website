import { getPosts } from '$lib/utils/posts'
import { compile, mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';

// @ts-ignore
export async function load({ params } : { params: { date: string, category: string, title: string } }) {
    const { date, category, title } = params;

    const slug = `${date}/${category}/${title}`;

    const posts = await getPosts()

    const post = posts.find(post => post.slug === slug)

    return {
        post: post,
    }
}