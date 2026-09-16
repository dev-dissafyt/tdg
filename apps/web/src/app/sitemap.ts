import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dailygrindhub.co.za';

  const routes = [
    '',
    '/about',
    '/team',
    '/contact',
    '/incubation',
    '/coworking',
    '/codetrepreneurs',
    '/3d-printing',
    '/cohorts',
    '/cohorts/2025/codetrepreneurs',
    '/cohorts/2025/3d-printing',
    '/cohorts/2024/codetrepreneurs',
    '/portal/dashboard',
    '/portal/tickets',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
