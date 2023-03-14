import { browser } from '$app/environment';
import { parse } from 'node-html-parser';

if (browser) {
  throw new Error('This file should only be imported on the server');
}

// get all posts and add metadata

export const posts = Object.entries(import.meta.glob('/posts/**/*.md', { eager: true }))
  .map(([path, post]) => {
    // @ts-ignore
    const html = parse(post.default.render().html);
    return {
      // @ts-ignore
      ...post.metadata,

      slug: path
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop(),

      isIndexFile: path.endsWith('/index.md'),

    };
  })
  // sort by date
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
