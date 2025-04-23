// /pages/api/activities/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Отримуємо активності з таблиці activities
    const [activities] = await db.execute('SELECT * FROM activities');
    return res.status(200).json(activities);
  } catch (error) {
    console.error('DB Error:', error);
    return res.status(500).json({ message: 'Database error' });
  }
}
