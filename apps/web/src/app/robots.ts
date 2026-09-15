import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal/applications/*/internal', '/api/private/'],
    },
    sitemap: 'https://dailygrindhub.co.za/sitemap.xml',
  };
}
