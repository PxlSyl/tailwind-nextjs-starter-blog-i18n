'use client';
import { useState } from 'react';

const mockActivities = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title_uk: `Назва ${i + 1}`,
  title_en: `Title ${i + 1}`,
  short_desc_uk: 'Короткий опис',
  short_desc_en: 'Short desc',
  full_desc_uk: 'Повний опис',
  full_desc_en: 'Full description',
  max_participants: 20,
  booked_participants: 5
}));

export default function ActivitiesPage() {
  const [activities] = useState(mockActivities);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Список активностей</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Назва (UK)</th>
            <th className="border px-2 py-1">Назва (EN)</th>
            <th className="border px-2 py-1">Учасники</th>
            <th className="border px-2 py-1">Дії</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id}>
              <td className="border px-2 py-1 text-center">{a.id}</td>
              <td className="border px-2 py-1">{a.title_uk}</td>
              <td className="border px-2 py-1">{a.title_en}</td>
              <td className="border px-2 py-1 text-center">{a.booked_participants}/{a.max_participants}</td>
              <td className="border px-2 py-1 text-center">
                <button className="bg-blue-600 text-white px-2 py-1 text-sm rounded">Редагувати</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
