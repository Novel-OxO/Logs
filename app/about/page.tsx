export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-6 lg:py-10">
      <div className="mb-8 flex flex-col items-start gap-4 border-b pb-8">
        <h1 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl lg:leading-[1.1]">
          About
        </h1>
        <p className="text-muted-foreground text-xl">About this blog and the author.</p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>This is a developer blog built with Next.js, Tailwind CSS, and Velite.</p>
        <p>I write about web development, software engineering, and other tech topics.</p>
      </div>
    </div>
  );
}
