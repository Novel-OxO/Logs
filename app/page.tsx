import { posts } from '@/velite';
import { PostList } from '@/components/post-list';

export default function Home() {
  const displayPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto max-w-[980px] py-10">
      {displayPosts?.length > 0 ? <PostList posts={displayPosts} /> : <p>No posts published.</p>}
    </div>
  );
}
