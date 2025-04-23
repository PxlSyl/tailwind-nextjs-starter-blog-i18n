'use client';

import LoginModal from '../components/LoginModal';

export default function HomePage() {
  const [showLogin, setShowLogin] = React.useState(true);

  return (
    <main>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <section className="min-h-screen bg-red-200 flex items-center justify-center">Блок 1</section>
      <section className="min-h-screen bg-blue-200 flex items-center justify-center">Блок 2</section>
      <section className="min-h-screen bg-green-200 flex items-center justify-center">Блок 3</section>
      <section className="min-h-screen bg-yellow-200 flex items-center justify-center">Блок 4</section>
      <section className="min-h-screen bg-purple-200 flex items-center justify-center">Блок 5</section>
    </main>
  );
}
