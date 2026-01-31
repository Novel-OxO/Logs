import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Dev Log';
  const date = searchParams.get('date') || '';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        padding: '60px 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <span
          style={{
            fontSize: 24,
            color: '#a1a1aa',
            fontWeight: 500,
          }}
        >
          Dev Log
        </span>

        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#fafafa',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {date && (
          <span
            style={{
              fontSize: 24,
              color: '#71717a',
              marginTop: '20px',
            }}
          >
            {date}
          </span>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          N
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
