import { defineConfig, s } from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/index.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path(),
          category: s.enum(['Frontend', 'Backend', 'Essay']).default('Essay'),
          series: s.string().optional(),
          date: s.isodate(),
          updated: s.isodate().optional(),
          published: s.boolean().default(true),
          description: s.string().max(200).optional(),
          tags: s.array(s.string()).default([]),
          image: s.image().optional(),
          body: s.mdx(),
        })
        .transform((data) => {
          // 'posts/tech/velite/index' -> 'tech/velite'
          const slug = data.slug.replace(/^posts\//, '').replace(/\/index$/, '');
          return {
            ...data,
            slug,
            url: `/blog/${slug}`,
          };
        }),
    },
  },
});
