import siteMetadata from "@/data/siteMetadata"

const RobotsTxt = () => {}

    export const getServerSideProps = async ({res}) => {
        const robotsTxtData = `User-agent: *
        Allow: /
        Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
        Host: ${siteMetadata.siteUrl}`;
        
          res.setHeader('Content-Type', 'text/plain');
          res.write(robotsTxtData);
          res.end();
        
          return {
            props: {}, // No props needed as nothing is rendered
          };
        };
        
        export default RobotsTxt;