// app/robots.ts
import { NextResponse } from 'next/server';
import siteMetadata from '@/data/siteMetadata';

export const GET = () => {
  const robotsContent = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
Host: ${siteMetadata.siteUrl}`;

  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

export default GET;
