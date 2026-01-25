export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="mx-auto flex max-w-[980px] flex-col items-start gap-2 pb-8 pt-8 md:pt-12">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl">
          Welcome to Dev Log
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A developer blog built with Next.js, Tailwind CSS, and Velite.
        </p>
      </section>
    </div>
  );
}
