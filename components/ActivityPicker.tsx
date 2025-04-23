import React, { useState } from 'react';

interface Activity {
  id: number;
  title: string;
}

interface ActivityPickerProps {
  activities: Activity[];
  userEmail: string;  // Додаємо userEmail
}

const ActivityPicker: React.FC<ActivityPickerProps> = ({ activities, userEmail }) => {
  const [selectedDay1, setSelectedDay1] = useState<number[]>([]);
  const [selectedDay2, setSelectedDay2] = useState<number[]>([]);
  const [selectedDay3, setSelectedDay3] = useState<number[]>([]);

  const handleCheckboxChange = (day: number, activityId: number, isChecked: boolean) => {
    const setSelectedDay = day === 1 ? setSelectedDay1 : day === 2 ? setSelectedDay2 : setSelectedDay3;
    if (isChecked) {
      setSelectedDay((prevSelected) => [...prevSelected, activityId]);
    } else {
      setSelectedDay((prevSelected) => prevSelected.filter((id) => id !== activityId));
    }
  };

  const handleSave = async (day: number) => {
    let selectedActivities: number[] = [];
    if (day === 1) selectedActivities = selectedDay1;
    if (day === 2) selectedActivities = selectedDay2;
    if (day === 3) selectedActivities = selectedDay3;
    
    // Ensure that there are activities selected
    if (selectedActivities.length === 0) {
      alert('Будь ласка, виберіть хоча б одну активність');
      return;
    }

    // Отправка на сервер
    try {
      const response = await fetch('/api/activities/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail, // Використовуємо email користувача
          day,
          activities: selectedActivities,
        }),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Сталася помилка під час збереження даних');
    }
  };

  return (
    <div>
      {[1, 2, 3].map((day) => (
        <div key={day}>
          <h3>День {day}</h3>
          {activities.map((activity) => (
            <div key={activity.id}>
              <input
                type="checkbox"
                id={`activity-${activity.id}`}
                onChange={(e) =>
                  handleCheckboxChange(day, activity.id, e.target.checked)
                }
              />
              <label htmlFor={`activity-${activity.id}`}>{activity.title}</label>
            </div>
          ))}
          <button onClick={() => handleSave(day)}>Зберегти вибір</button>
        </div>
      ))}
    </div>
  );
};

export default ActivityPicker;
