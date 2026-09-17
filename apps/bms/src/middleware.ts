import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Skip Next.js system routes, static assets, and favicon
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Strip ports (e.g. localhost:3002 -> localhost)
  const hostWithoutPort = hostname.split(':')[0];

  // Detect wildcard subdomain:
  // e.g. "kasipay.dailygrindhub.co.za" -> parts: ["kasipay", "dailygrindhub", "co", "za"]
  // e.g. "kasipay.localhost" -> parts: ["kasipay", "localhost"]
  const parts = hostWithoutPort.split('.');
  
  const isLocalhost = hostWithoutPort.endsWith('localhost');
  let subdomain: string | null = null;

  if (isLocalhost && parts.length > 1) {
    subdomain = parts[0];
  } else if (!isLocalhost && parts.length >= 3) {
    // For domains like "kasipay.dailygrindhub.co.za" or "kasipay.vercel.app"
    // Filter out common reserved subdomains
    if (parts[0] !== 'www' && parts[0] !== 'bms' && parts[0] !== 'admin') {
      subdomain = parts[0];
    }
  }

  // If a valid venture subdomain is detected, rewrite paths dynamically
  if (subdomain) {
    const slug = subdomain.toLowerCase();
    // If the path doesn't already have the slug prefixed, rewrite to /[slug]/...
    if (!url.pathname.startsWith(`/${slug}`)) {
      const targetPath = url.pathname === '/' ? `/${slug}/canvas` : `/${slug}${url.pathname}`;
      return NextResponse.rewrite(new URL(targetPath, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
