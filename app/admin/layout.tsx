// app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Панель адміністратора',
  description: 'Адмінка для керування активностями та інформаційними блоками',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <header className="bg-gray-800 text-white p-4 text-xl font-bold">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>Панель адміністратора</div>
            <nav className="space-x-4 text-base">
              <Link href="/admin/activities" className="hover:underline">Активності</Link>
              <Link href="/admin/blocks" className="hover:underline">Інфо блоки</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
