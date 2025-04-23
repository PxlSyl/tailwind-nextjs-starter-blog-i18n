import { db } from '../../lib/db';


export default async function handler(req, res) {
  const { email, password } = req.body;
  const [rows] = await db.execute('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password]);
  if (rows.length > 0) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Невірні дані' });
  }
}
