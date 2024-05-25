import fs from 'fs';
import path from 'path';
import siteMetadata from '../data/siteMetadata.js';

const publicDirPath = path.resolve(process.cwd(), '..', 'public');
const robotsFilePath = path.join(publicDirPath, 'robots.txt');

const robotsContent = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
Host: ${siteMetadata.siteUrl}`;

// Write the robots.txt file
fs.writeFileSync(robotsFilePath, robotsContent, { flag: 'w' });
