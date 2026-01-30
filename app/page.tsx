import { PostList } from '@/components/post-list';
import { posts } from '@/velite';

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
