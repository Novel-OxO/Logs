interface BookmarkProps {
  url: string;
}

export function Bookmark({ url }: BookmarkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block rounded-lg border p-4 transition-colors hover:bg-muted/50"
    >
      <span className="text-sm text-muted-foreground">{url}</span>
    </a>
  );
}

export function LinkPreview({ url }: BookmarkProps) {
  return <Bookmark url={url} />;
}

export function Embed({ url }: BookmarkProps) {
  return (
    <div className="my-4 aspect-video">
      <iframe
        className="h-full w-full rounded-lg border"
        src={url}
        title="Embedded content"
        allowFullScreen
      />
    </div>
  );
}
