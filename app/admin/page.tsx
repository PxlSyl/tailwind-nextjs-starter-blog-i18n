'use client';

import { useState } from 'react';

const initialBlocks = [
  { id: 1, block_order: 1, lang: 'uk', type: 'text', content: 'Блок 1' },
  { id: 2, block_order: 2, lang: 'uk', type: 'text', content: 'Блок 2' },
  { id: 3, block_order: 3, lang: 'uk', type: 'text', content: 'Блок 3' },
  { id: 4, block_order: 4, lang: 'uk', type: 'text', content: 'Блок 4' },
  { id: 5, block_order: 5, lang: 'uk', type: 'text', content: 'Блок 5' },
];

export default function AdminPage() {
  const [blocks, setBlocks] = useState(initialBlocks);

  const handleChange = (index: number, value: string) => {
    const updated = [...blocks];
    updated[index].content = value;
    setBlocks(updated);
  };

  const handleSave = () => {
    console.log('Збережено:', blocks);
    alert('Формально збережено (дані виведено в консоль)');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Адмінпанель: Редагування блоків</h1>
      {blocks.map((block, index) => (
        <div key={block.id} className="mb-4">
          <label className="block mb-1 font-semibold">Блок {block.block_order}</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={block.content}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Зберегти
      </button>
    </div>
  );
}
