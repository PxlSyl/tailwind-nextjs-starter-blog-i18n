// components/LoginModal.tsx
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string; // Отримуємо email користувача
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [email, setEmail] = useState(userEmail || ''); // Використовуємо email користувача
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleLogin = async () => {
    if (!selectedActivities.length) {
      alert('Будь ласка, виберіть хоча б одну активність!');
      return;
    }

    // Логіка авторизації або будь-яка інша операція
    alert(`Вітаємо, ${email}`);
    onClose(); // Закриваємо модальне вікно після успішної авторизації
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as 'uk' | 'en');
  };

  const handleActivityChange = (activityId: string) => {
    setSelectedActivities((prevActivities) =>
      prevActivities.includes(activityId)
        ? prevActivities.filter((id) => id !== activityId)
        : [...prevActivities, activityId]
    );
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-lg w-80">
          <h2 className="text-xl font-semibold">Вхід</h2>
          <div className="mt-4">
            <input
              type="email"
              className="border rounded w-full p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Вибір мови */}
          <div className="mt-4">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="border rounded w-full p-2"
            >
              <option value="uk">Українська</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Вибір активностей */}
          <div className="mt-4">
            <h3>Виберіть активності:</h3>
            <div>
              {['Активність 1', 'Активність 2', 'Активність 3'].map((activity, index) => (
                <label key={index} className="block">
                  <input
                    type="checkbox"
                    value={activity}
                    onChange={() => handleActivityChange(activity)}
                    checked={selectedActivities.includes(activity)}
                  />
                  {activity}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Увійти
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default LoginModal;
