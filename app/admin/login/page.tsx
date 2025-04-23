'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) setError(data.message || 'Помилка входу');
    else router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Вхід для адміністраторів</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-3" />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-3" />
        <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full rounded">Увійти</button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
