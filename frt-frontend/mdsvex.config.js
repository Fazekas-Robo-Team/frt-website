import relativeImages from 'mdsvex-relative-images';

export default {
    extensions: ['.md'],
    layout: "./src/lib/markdown.svelte",
    smartypants: {
        dashes: 'oldschool',
    },
    remarkPlugins: [relativeImages],
};