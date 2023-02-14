// @ts-ignore
export async function load({ data }) {
	const component = await import(`../../../../../posts/${data.post.slug}/index.md`);

	return {
		post: data.post,
		component: component.default
	};
}
