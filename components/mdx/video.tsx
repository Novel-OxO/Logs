interface VideoProps {
  src: string;
}

export function Video({ src }: VideoProps) {
  const isYoutube = src.includes('youtube.com') || src.includes('youtu.be');

  if (isYoutube) {
    const videoId = src.includes('youtu.be')
      ? src.split('/').pop()
      : new URL(src).searchParams.get('v');

    return (
      <div className="my-4 aspect-video">
        <iframe
          className="h-full w-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video className="my-4 w-full rounded-lg" controls>
      <source src={src} />
      <track kind="captions" />
    </video>
  );
}
