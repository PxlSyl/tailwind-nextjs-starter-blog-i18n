import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, title_uk, title_en, content_uk, content_en } = req.body;

  if (!id || !title_uk || !title_en || !content_uk || !content_en) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    await db.execute(
      `UPDATE content_blocks SET title_uk = ?, title_en = ?, content_uk = ?, content_en = ? WHERE id = ?`,
      [title_uk, title_en, content_uk, content_en, id]
    );

    return res.status(200).json({ message: 'Block updated' });
  } catch (error) {
    console.error('DB Error:', error);
    return res.status(500).json({ message: 'Database error' });
  }
}