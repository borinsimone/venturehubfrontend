import React, { useState } from 'react';

function NotificationsSection() {
  const [notificationSettings, setNotificationSettings] = useState({
    activities: true,
    changes: true,
    bookings: true,
  });
  const [reminderTime, setReminderTime] = useState('1-hour');

  return (
    <section className='settings-section'>
      <h2>Il Tuo Ritmo, Le Tue Notifiche</h2>

      <div className='setting-item'>
        <h3>Tipo di notifiche</h3>
        <div className='notification-option'>
          <input
            type='checkbox'
            id='notify-activities'
            checked={notificationSettings.activities}
            onChange={() =>
              setNotificationSettings({
                ...notificationSettings,
                activities: !notificationSettings.activities,
              })
            }
          />
          <label htmlFor='notify-activities'>
            Promemoria per attività imminenti
          </label>
        </div>

        <div className='notification-option'>
          <input
            type='checkbox'
            id='notify-changes'
            checked={notificationSettings.changes}
            onChange={() =>
              setNotificationSettings({
                ...notificationSettings,
                changes: !notificationSettings.changes,
              })
            }
          />
          <label htmlFor='notify-changes'>
            Notifiche per modifiche al programma
          </label>
        </div>

        <div className='notification-option'>
          <input
            type='checkbox'
            id='notify-bookings'
            checked={notificationSettings.bookings}
            onChange={() =>
              setNotificationSettings({
                ...notificationSettings,
                bookings: !notificationSettings.bookings,
              })
            }
          />
          <label htmlFor='notify-bookings'>
            Alert per prenotazioni da confermare
          </label>
        </div>
      </div>

      <div className='setting-item'>
        <h3>Tempistiche promemoria</h3>
        <select
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        >
          <option value='30-min'>30 minuti prima</option>
          <option value='1-hour'>1 ora prima</option>
          <option value='3-hours'>3 ore prima</option>
          <option value='1-day'>1 giorno prima</option>
        </select>
      </div>
    </section>
  );
}

export default NotificationsSection;
