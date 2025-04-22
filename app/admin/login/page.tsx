'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError('Невірні дані');

    const { data: admin, error: adminErr } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (!admin || adminErr) return setError('Немає доступу');
    router.push('/admin');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Адмін логін</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" className="border p-2 w-full mb-2" />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full">Увійти</button>
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
    </div>
  );
}
