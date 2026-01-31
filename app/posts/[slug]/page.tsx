import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode from 'rehype-pretty-code';
import { MdxRenderer } from '@/components/mdx/mdx-renderer';
import { getAllPosts, getPostBySlug } from '@/lib/get-posts';
import { getPostContent } from '@/lib/notion-to-mdx';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await getPostContent(post.id);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
          },
        ],
      ],
    },
  });

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          {post.category && (
            <span className="rounded-full bg-muted px-3 py-1 text-sm">{post.category}</span>
          )}
          {post.date && (
            <time dateTime={post.date}>{dayjs(post.date).format('YYYY년 MM월 DD일')}</time>
          )}
        </div>
        {post.description && (
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MdxRenderer source={mdxSource} />
      </div>
    </article>
  );
}
