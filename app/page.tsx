import dayjs from 'dayjs';
import Link from 'next/link';
import { getAllPosts } from '@/lib/get-posts';

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();

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
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block rounded-lg border p-6 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="mt-2 text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                        {post.category && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5">
                            {post.category}
                          </span>
                        )}
                        {post.date && (
                          <time dateTime={post.date}>{dayjs(post.date).format('YYYY.MM.DD')}</time>
                        )}
                      </div>
                    </div>
                    {post.thumbnail && (
                      <div className="hidden sm:block flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-24 w-36 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
