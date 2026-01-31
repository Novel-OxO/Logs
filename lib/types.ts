export interface Site {
  name: string;
  domain: string;
  description?: string;
  image?: string;
}

export interface PageUrlOverridesMap {
  [pagePath: string]: string;
}

export interface PageUrlOverridesInverseMap {
  [pageId: string]: string;
}
