import { NextResponse } from 'next/server';
import siteMetadata from '@/data/siteMetadata';

const handler = (req, res) => {

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

export { handler as GET, handler as POST};
