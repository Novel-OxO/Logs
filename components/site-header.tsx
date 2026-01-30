'use client';

import { Menu, Package2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { ScrollProgress } from '@/components/scroll-progress';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();

  const routes = [
    {
      href: '/about',
      label: 'About',
    },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="text-primary h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Dev <span className="text-primary">Log</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'hover:text-primary transition-colors',
                  pathname?.startsWith(route.href) ? 'text-primary' : 'text-foreground/60',
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center">
              <Package2 className="text-primary mr-2 h-4 w-4" />
              <span className="font-bold">
                Dev <span className="text-primary">Log</span>
              </span>
            </Link>
            <nav className="mt-8 flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'text-foreground/70 hover:text-primary transition-colors',
                    pathname?.startsWith(route.href) && 'text-primary',
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component can go here */}
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
