export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  date: string | null;
  thumbnail: string | null;
  published: boolean;
  description: string | null;
}

export interface Post extends PostMeta {
  content: string;
}
