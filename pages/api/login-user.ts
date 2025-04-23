import { db } from '../../lib/db';


export default async function handler(req, res) {
  const { email } = req.body;
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length > 0) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Користувача не знайдено' });
  }
}
