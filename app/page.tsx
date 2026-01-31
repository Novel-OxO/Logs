import { PostList } from '@/components/post-list';
import { getAllPosts } from '@/lib/get-posts';

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();

  // Transform posts to match PostList interface
  const transformedPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description || undefined,
    date: post.date || new Date().toISOString().split('T')[0],
    url: `/posts/${post.slug}`,
    category: post.category || undefined,
    thumbnail: post.thumbnail || undefined,
  }));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Dev Log</h1>
        <p className="text-lg text-muted-foreground">개발 관련 글을 기록합니다.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">최근 글</h2>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">아직 게시된 글이 없습니다.</p>
        ) : (
          <PostList posts={transformedPosts} />
        )}
      </section>
    </div>
  );
}
