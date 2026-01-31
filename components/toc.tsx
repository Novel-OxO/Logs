'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' },
    );

    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        if (toc.length > 0) {
          const getLastId = (items: TocItem[]): string => {
            const last = items[items.length - 1];
            if (last.items && last.items.length > 0) {
              return getLastId(last.items);
            }
            return last.url.replace('#', '');
          };
          setActiveId(getLastId(toc));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toc]);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="mb-4 text-lg font-medium">On This Page</p>
      <div className="border-border/50 relative border-l">
        <ul className="m-0 list-none">
          {toc.map((item, index) => {
            const isActive = item.url === `#${activeId}`;
            return (
              <li key={`${item.url}-${index}`} className="mt-0 pt-0">
                <a
                  href={item.url}
                  className={cn(
                    'hover:text-primary block py-1 pl-4 text-sm no-underline transition-all',
                    isActive
                      ? 'text-primary border-primary -ml-[2px] border-l-2 font-medium'
                      : 'text-muted-foreground/80',
                  )}
                >
                  {item.title}
                </a>
                {item.items && item.items.length > 0 && (
                  <ul className="m-0 list-none">
                    {item.items.map((subItem, subIndex) => {
                      const isSubActive = subItem.url === `#${activeId}`;
                      return (
                        <li key={`${subItem.url}-${subIndex}`} className="mt-0 pt-0">
                          <a
                            href={subItem.url}
                            className={cn(
                              'hover:text-primary block py-1 pl-8 text-sm no-underline transition-all',
                              isSubActive
                                ? 'text-primary border-primary -ml-[2px] border-l-2 font-medium'
                                : 'text-muted-foreground/80',
                            )}
                          >
                            {subItem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
