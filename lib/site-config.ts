export interface SiteConfig {
  name: string;
  domain: string;
  author: string;
  description?: string;
  language?: string;

  twitter?: string;
  github?: string;
  linkedin?: string;
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config;
};
