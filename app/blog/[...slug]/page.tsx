import { notFound } from 'next/navigation';
import { posts } from '@/velite';
import { MDXContent } from '@/components/mdx-content';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params.slug.join('/');
  const post = posts.find((post) => post.slug === slug);
  return post;
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug.split('/'),
    }));
}

import { TableOfContents } from '@/components/toc';

// ... (other imports)

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="relative container mx-auto py-6 lg:py-10">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[240px_1fr_240px]">
        <div className="hidden xl:block" /> {/* Left shim for centering */}
        <article className="prose dark:prose-invert mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col items-start gap-4 border-b pb-8">
            <h1 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl lg:leading-[1.1]">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              {post.date && (
                <time dateTime={post.date} className="text-muted-foreground text-sm">
                  Published on {new Date(post.date).toLocaleDateString()}
                </time>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-muted-foreground bg-muted rounded-md px-2 py-0.5 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <MDXContent code={post.body} />
        </article>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <TableOfContents toc={post.toc} />
          </div>
        </div>
      </div>
    </div>
  );
}
