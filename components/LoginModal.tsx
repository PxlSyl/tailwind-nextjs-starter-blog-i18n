'use client';

import { useState } from 'react';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [lang, setLang] = useState('uk');
  const [message, setMessage] = useState('');


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Увійти</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="border p-2 w-full mb-3">
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </select>

        <button onClick={onClose} className="text-sm text-gray-600 underline w-full text-center">
          Закрити
        </button>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}
