'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="outline"
      className={cn(
        'group hover:bg-primary dark:hover:bg-primary hover:border-primary fixed right-8 bottom-8 z-50 h-10 w-10 rounded-full shadow-md transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0',
      )}
      onClick={scrollToTop}
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUp className="text-primary group-hover:text-primary-foreground h-5 w-5 transition-colors" />
    </Button>
  );
}
