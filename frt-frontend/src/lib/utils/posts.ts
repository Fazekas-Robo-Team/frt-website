import { browser } from '$app/environment';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { parse } from 'node-html-parser';

if (browser) {
	throw new Error('This file should only be imported on the server');
}

// fetch GET ${PUBLIC_BACLEND_URL}/blog and return the posts sorted by date

export async function getPosts() {
  const res = await fetch(`${PUBLIC_BACKEND_URL}/blog`);
  const res_json = await res.json();
  const posts = res_json.data;
  console.log(posts);
  posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}
