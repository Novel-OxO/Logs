import { Client } from '@notionhq/client';

const apiKey = process.env.NOTION_API_KEY;
const dbId = process.env.NOTION_DATABASE_ID;

if (!apiKey) {
  console.warn('Warning: Missing NOTION_API_KEY environment variable');
}

if (!dbId) {
  console.warn('Warning: Missing NOTION_DATABASE_ID environment variable');
}

export const notion = apiKey ? new Client({ auth: apiKey }) : null;

export const databaseId = dbId || '';

let cachedDataSourceId: string | null = null;

export async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;

  if (!notion || !databaseId) {
    throw new Error('Notion client or database ID not configured');
  }

  // biome-ignore lint/suspicious/noExplicitAny: Notion API response types
  const db: any = await notion.databases.retrieve({ database_id: databaseId });

  if (!db.data_sources || db.data_sources.length === 0) {
    throw new Error('No data sources found for database');
  }

  cachedDataSourceId = db.data_sources[0].id;
  return cachedDataSourceId as string;
}
