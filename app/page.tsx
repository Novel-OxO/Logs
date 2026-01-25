import Link from "next/link";
import { posts } from "@/velite";

export default function Home() {
  const displayPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container max-w-[980px] py-10">

      {displayPosts?.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {displayPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <div className="relative aspect-video overflow-hidden rounded-md border bg-muted transition-colors border-border group-hover:border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image.src}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1">
                <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  <Link href={post.url} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                  </Link>
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {post.date && (
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  )}
                </div>
                {post.description && (
                  <p className="text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
