import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';
import { notion } from './notion-official';

type Block = BlockObjectResponse | PartialBlockObjectResponse;

export async function getPageBlocks(pageId: string): Promise<Block[]> {
  if (!notion) {
    console.warn('Notion client not initialized');
    return [];
  }

  const blocks: Block[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(
      ...response.results.filter((block): block is BlockObjectResponse => 'type' in block),
    );
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

async function getBlockChildren(blockId: string): Promise<Block[]> {
  return getPageBlocks(blockId);
}

function richTextToMarkdown(richText: RichTextItemResponse[]): string {
  if (!richText || richText.length === 0) return '';

  return richText
    .map((text) => {
      let content = text.plain_text || '';

      if (text.annotations) {
        if (text.annotations.code) {
          content = `\`${content}\``;
        }
        if (text.annotations.bold) {
          content = `**${content}**`;
        }
        if (text.annotations.italic) {
          content = `*${content}*`;
        }
        if (text.annotations.strikethrough) {
          content = `~~${content}~~`;
        }
        if (text.annotations.underline) {
          content = `<u>${content}</u>`;
        }
      }

      if (text.href) {
        content = `[${content}](${text.href})`;
      }

      return content;
    })
    .join('');
}

async function blockToMarkdown(block: Block, indent = 0): Promise<string> {
  const indentStr = '  '.repeat(indent);

  if (!('type' in block)) {
    return '';
  }

  const type = block.type;

  switch (type) {
    case 'paragraph':
      return `${indentStr}${richTextToMarkdown(block.paragraph.rich_text)}\n`;

    case 'heading_1':
      return `${indentStr}# ${richTextToMarkdown(block.heading_1.rich_text)}\n`;

    case 'heading_2':
      return `${indentStr}## ${richTextToMarkdown(block.heading_2.rich_text)}\n`;

    case 'heading_3':
      return `${indentStr}### ${richTextToMarkdown(block.heading_3.rich_text)}\n`;

    case 'bulleted_list_item': {
      let content = `${indentStr}- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}\n`;
      if (block.has_children) {
        const children = await getBlockChildren(block.id);
        for (const child of children) {
          content += await blockToMarkdown(child, indent + 1);
        }
      }
      return content;
    }

    case 'numbered_list_item': {
      let content = `${indentStr}1. ${richTextToMarkdown(block.numbered_list_item.rich_text)}\n`;
      if (block.has_children) {
        const children = await getBlockChildren(block.id);
        for (const child of children) {
          content += await blockToMarkdown(child, indent + 1);
        }
      }
      return content;
    }

    case 'to_do': {
      const checked = block.to_do.checked ? 'x' : ' ';
      return `${indentStr}- [${checked}] ${richTextToMarkdown(block.to_do.rich_text)}\n`;
    }

    case 'toggle': {
      let content = `${indentStr}<details>\n${indentStr}<summary>${richTextToMarkdown(block.toggle.rich_text)}</summary>\n\n`;
      if (block.has_children) {
        const children = await getBlockChildren(block.id);
        for (const child of children) {
          content += await blockToMarkdown(child, indent);
        }
      }
      content += `${indentStr}</details>\n`;
      return content;
    }

    case 'code': {
      const language = block.code.language || 'text';
      const code = richTextToMarkdown(block.code.rich_text);
      return `${indentStr}\`\`\`${language}\n${code}\n\`\`\`\n`;
    }

    case 'quote':
      return `${indentStr}> ${richTextToMarkdown(block.quote.rich_text)}\n`;

    case 'callout': {
      const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '💡';
      const text = richTextToMarkdown(block.callout.rich_text);
      return `${indentStr}<Callout icon="${icon}">\n${indentStr}${text}\n${indentStr}</Callout>\n`;
    }

    case 'divider':
      return `${indentStr}---\n`;

    case 'image': {
      let url = '';
      if (block.image.type === 'external') {
        url = block.image.external.url;
      } else if (block.image.type === 'file') {
        url = block.image.file.url;
      }
      const caption = block.image.caption ? richTextToMarkdown(block.image.caption) : '';
      return `${indentStr}![${caption}](${url})\n`;
    }

    case 'video': {
      let url = '';
      if (block.video.type === 'external') {
        url = block.video.external.url;
      } else if (block.video.type === 'file') {
        url = block.video.file.url;
      }
      return `${indentStr}<Video src="${url}" />\n`;
    }

    case 'bookmark':
      return `${indentStr}<Bookmark url="${block.bookmark.url}" />\n`;

    case 'link_preview':
      return `${indentStr}<LinkPreview url="${block.link_preview.url}" />\n`;

    case 'embed':
      return `${indentStr}<Embed url="${block.embed.url}" />\n`;

    case 'table': {
      if (!block.has_children) return '';
      const rows = await getBlockChildren(block.id);
      let table = '';

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!('type' in row) || row.type !== 'table_row') continue;

        const cells = row.table_row.cells.map((cell) => richTextToMarkdown(cell));
        table += `| ${cells.join(' | ')} |\n`;

        if (i === 0) {
          table += `| ${cells.map(() => '---').join(' | ')} |\n`;
        }
      }
      return table;
    }

    case 'column_list': {
      if (!block.has_children) return '';
      const columns = await getBlockChildren(block.id);
      let content = '<div className="grid grid-cols-2 gap-4">\n';
      for (const column of columns) {
        content += '<div>\n';
        if (!('has_children' in column) || !column.has_children) {
          content += '</div>\n';
          continue;
        }
        const columnChildren = await getBlockChildren(column.id);
        for (const child of columnChildren) {
          content += await blockToMarkdown(child);
        }
        content += '</div>\n';
      }
      content += '</div>\n';
      return content;
    }

    case 'child_page':
    case 'child_database':
    case 'synced_block':
    case 'template':
    case 'unsupported':
      return '';

    default:
      console.warn(`Unsupported block type: $type`);
      return '';
  }
}

export async function blocksToMdx(blocks: Block[]): Promise<string> {
  const mdxParts: string[] = [];

  for (const block of blocks) {
    const mdx = await blockToMarkdown(block);
    if (mdx) {
      mdxParts.push(mdx);
    }
  }

  return mdxParts.join('\n');
}

export async function getPostContent(pageId: string): Promise<string> {
  const blocks = await getPageBlocks(pageId);
  return blocksToMdx(blocks);
}
