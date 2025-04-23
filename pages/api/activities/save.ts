// /pages/api/activities/save.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не дозволено' });
  }

  const { email, day, activities } = req.body;

  if (!email || !day || !Array.isArray(activities)) {
    return res.status(400).json({ message: 'Невірні дані' });
  }

  let column = '';
  if (day === 1) column = 'day1_activities';
  else if (day === 2) column = 'day2_activities';
  else if (day === 3) column = 'day3_activities';
  else return res.status(400).json({ message: 'Невірний день' });

  try {
    const ids = activities.join(',');  // Перетворюємо масив активностей в рядок для зберігання в БД
    await db.execute(
      `UPDATE users SET ${column} = ? WHERE email = ?`,
      [ids, email]
    );

    return res.status(200).json({ message: 'Активності оновлено' });
  } catch (error) {
    console.error('Помилка в БД:', error);
    return res.status(500).json({ message: 'Помилка на сервері' });
  }
}
