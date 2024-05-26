import { NextApiRequest, NextApiResponse } from 'next';

const robots = async (req: NextApiRequest, res: NextApiResponse) => {
  const rules = {
    userAgent: '*',
    allow: '/',
    disallow: ['/private/'],
  };

  return res.status(200).send(`User-agent: *\nDisallow: ${rules.disallow.join(', ')}\nAllow: ${rules.allow}`);
};

export default robots;