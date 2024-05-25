// Import necessary modules and data
import { NextResponse, NextRequest } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

// Define the handler function
const handler = (req: NextRequest, res: NextResponse) => {
  // Generate the content of the robots.txt file
  const robotsContent = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
Host: ${siteMetadata.siteUrl}`

  // Return a NextResponse object with the robots.txt content
  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

// Export the handler function as the default export
export { handler as GET, handler as POST }
