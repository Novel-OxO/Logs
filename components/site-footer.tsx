import { Package2 } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Package2 className="text-primary h-6 w-6" />
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://github.com/Novel-OxO"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Novel-OxO
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/Novel-OxO/Logs"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
