import { getEnv, getRequiredSiteConfig, getSiteConfig } from './get-config-value';
import type { Site } from './types';

export const environment = process.env.NODE_ENV || 'development';
export const isDev = environment === 'development';

// 사이트 기본 설정
export const name: string = getRequiredSiteConfig('name');
export const author: string = getRequiredSiteConfig('author');
export const domain: string = getRequiredSiteConfig('domain');
export const description: string = getSiteConfig('description', 'Notion Blog');
export const language: string = getSiteConfig('language', 'ko');

// 소셜 계정
export const twitter: string | undefined = getSiteConfig('twitter');
export const github: string | undefined = getSiteConfig('github');
export const linkedin: string | undefined = getSiteConfig('linkedin');

export const port = getEnv('PORT', '3000');
export const host = isDev ? `http://localhost:${port}` : `https://${domain}`;

export const site: Site = {
  domain,
  name,
  description,
};
