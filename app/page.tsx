import React, { useEffect, useState } from 'react';
import ActivityPicker from '../components/ActivityPicker'; // Імпортуємо ActivityPicker

function HomePage() {
  const [userEmail, setUserEmail] = useState<string>(''); // Створюємо стейт для email
  const [activities, setActivities] = useState<any[]>([]); // Стан для активностей

  useEffect(() => {
    // Отримуємо email з sessionStorage або іншого джерела
    const emailFromSession = sessionStorage.getItem('email');
    if (emailFromSession) {
      setUserEmail(emailFromSession);
    }

    // Логіка для отримання активностей (якщо є)
    async function fetchActivities() {
      const response = await fetch('/api/activities');
      const data = await response.json();
      setActivities(data);
    }

    fetchActivities();
  }, []);

  return (
    <main>
      <h1>Вибір активностей</h1>

      {/* Передаємо userEmail в компонент ActivityPicker */}
      <ActivityPicker activities={activities} userEmail={userEmail} />
    </main>
  );
}

export default HomePage;
