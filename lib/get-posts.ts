import { getDataSourceId, notion } from './notion-official';
import type { PostMeta } from './post-types';

// biome-ignore lint/suspicious/noExplicitAny: Notion API response types are complex and dynamic

function getRichTextContent(richText: any[]): string {
  return richText.map((text: any) => text.plain_text).join('');
}

function getPropertyValue(page: any, propertyName: string): string | null {
  const property = page.properties[propertyName];
  if (!property) return null;

  switch ((property as any).type) {
    case 'title':
      return getRichTextContent(property.title);
    case 'rich_text':
      return getRichTextContent(property.rich_text);
    case 'select':
      return property.select?.name ?? null;
    case 'date':
      return property.date?.start ?? null;
    case 'checkbox':
      return property.checkbox ? 'true' : 'false';
    case 'url':
      return property.url;
    case 'files':
      if (property.files.length > 0) {
        const file = property.files[0];
        if (file.type === 'file') {
          return file.file.url;
        }
        if (file.type === 'external') {
          return file.external.url;
        }
      }
      return null;
    default:
      return null;
  }
}

function pageToPostMeta(page: any): PostMeta {
  return {
    id: page.id,
    title: getPropertyValue(page, 'title') ?? 'Untitled',
    slug: getPropertyValue(page, 'slug') ?? page.id,
    category: getPropertyValue(page, 'category'),
    date: getPropertyValue(page, 'date'),
    thumbnail: getPropertyValue(page, 'thumbnail'),
    published: getPropertyValue(page, 'published') === 'true',
    description: getPropertyValue(page, 'description'),
  };
}

export async function getAllPosts(
  options: { includeUnpublished?: boolean } = {},
): Promise<PostMeta[]> {
  if (!notion) {
    console.warn('Notion client not initialized');
    return [];
  }

  const { includeUnpublished = false } = options;

  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: includeUnpublished
      ? undefined
      : {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });

  const posts = response.results.filter((page: any) => 'properties' in page).map(pageToPostMeta);

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  if (!notion) {
    console.warn('Notion client not initialized');
    return null;
  }

  const dataSourceId = await getDataSourceId();

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];
  if (!page || !('properties' in page)) {
    return null;
  }

  return pageToPostMeta(page as any);
}

export async function getPostById(pageId: string): Promise<PostMeta | null> {
  if (!notion) {
    console.warn('Notion client not initialized');
    return null;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    if (!('properties' in page)) {
      return null;
    }
    return pageToPostMeta(page as any);
  } catch {
    return null;
  }
}
