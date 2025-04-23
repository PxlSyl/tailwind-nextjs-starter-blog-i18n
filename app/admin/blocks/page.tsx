'use client';
import { useState } from 'react';

const mockBlocks = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  block_order: i + 1,
  info_uk: `Текст для блоку ${i + 1}`,
  info_en: `Text for block ${i + 1}`,
}));

export default function BlocksPage() {
  const [blocks] = useState(mockBlocks);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Редагування інформаційних блоків</h1>
      {blocks.map((block) => (
        <div key={block.id} className="mb-6 p-4 border rounded bg-white">
          <h2 className="font-semibold mb-2">Блок {block.block_order}</h2>
          <label className="block text-sm mb-1">Українською:</label>
          <textarea className="w-full border p-2 mb-2" rows={3} defaultValue={block.info_uk} />
          <label className="block text-sm mb-1">Англійською:</label>
          <textarea className="w-full border p-2 mb-2" rows={3} defaultValue={block.info_en} />
          <button className="bg-blue-600 text-white px-4 py-1 rounded">Зберегти</button>
        </div>
      ))}
    </div>
  );
}
