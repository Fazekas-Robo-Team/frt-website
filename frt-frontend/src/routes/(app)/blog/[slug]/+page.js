// @ts-ignore
export async function load({ params }) {
	const post = await import(`../../blog_posts/${params.slug}.md`);
	const { title, date, description, author } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		description,
		author
	};
}
