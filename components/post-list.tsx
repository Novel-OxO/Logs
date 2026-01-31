'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { SpotlightCard } from '@/components/ui/spotlight-card';

interface Post {
  slug: string;
  title: string;
  description?: string;
  date: string;
  url: string;
  category?: string;
  thumbnail?: string;
}

interface PostListProps {
  posts: Post[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PostList({ posts }: PostListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item} className="h-full">
          <SpotlightCard className="flex h-full flex-col border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#1C1C1F]">
            <Link href={post.url} className="group flex h-full flex-col">
              {/* Image Section */}
              <div className="p-2 pb-0">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-100 shadow-sm dark:border-neutral-800">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-100 dark:bg-neutral-900" />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                <div className="mb-3">
                  <span className="text-primary text-xs font-bold">{post.category || 'Essay'}</span>
                </div>

                <h2 className="mb-4 line-clamp-2 text-lg leading-snug font-bold tracking-tight text-neutral-900 transition-colors dark:text-neutral-100">
                  {post.title}
                </h2>

                <div className="mt-auto flex items-center text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  <Calendar className="mr-1.5 h-3.5 w-3.5 opacity-70" />
                  <time dateTime={post.date}>{dayjs(post.date).format('YYYY년 MM월 DD일')}</time>
                </div>
              </div>
            </Link>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
