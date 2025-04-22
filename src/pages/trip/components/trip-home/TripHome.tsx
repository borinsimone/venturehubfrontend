import React, { useMemo } from 'react';
import './TripHome.css';

import { useGlobalContext } from '../../../../context/GlobalContext';
import Meteo from './Meteo';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

// TypeScript interfaces for trip data
interface Balance {
  username: string;
  amount: number;
}

interface TodoItem {
  text: string;
  checked: boolean;
}

interface Activity {
  title: string;
  name?: string;
  time?: string;
  location?: string;
  completed: boolean;
  dayDate?: string;
  dayNumber?: number;
}

interface Day {
  date: string;
  day: number;
  activities: Activity[];
}

interface TripData {
  id: string;
  destination: string;
  image: string;
  date: string;
  participants: string[];
  balances: Balance[];
  totalExpenses: number;
  mainToDo: TodoItem[];
  days: Day[];
}

interface TripHomeProps {
  activeTrip: TripData;
}

function TripHome({ activeTrip }: TripHomeProps) {
  // Find the next upcoming event from all activities
  const nextEvent = useMemo(() => {
    if (!activeTrip?.days || !Array.isArray(activeTrip.days)) {
      return null;
    }

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Collect all activities from all days with their dates
    const allActivities = activeTrip.days.flatMap((day) => {
      // Skip days that don't have activities array
      if (!Array.isArray(day.activities)) return [];

      return day.activities.map((activity) => ({
        ...activity,
        dayDate: day.date, // Keep the day's date for reference
        dayNumber: day.day,
      }));
    });

    // Filter for incomplete activities only
    const incompleteActivities = allActivities.filter(
      (activity) => !activity.completed
    );

    if (incompleteActivities.length === 0) return null;

    // Convert activity times to comparable values
    const activitiesWithTime = incompleteActivities.map((activity) => {
      const timeStr = activity.time || '00:00';

      // Parse time string (assumes format like "9:30 AM" or "14:30")
      let hours = 0;
      let minutes = 0;

      if (timeStr.includes(':')) {
        const timeParts = timeStr.split(' ')[0].split(':');
        hours = parseInt(timeParts[0], 10) || 0;
        minutes = parseInt(timeParts[1], 10) || 0;

        // Handle AM/PM
        if (timeStr.toLowerCase().includes('pm') && hours < 12) {
          hours += 12;
        } else if (timeStr.toLowerCase().includes('am') && hours === 12) {
          hours = 0;
        }
      }

      // Create a date object for sorting (using day's date)
      const activityDate = new Date(activity.dayDate || todayStr);
      activityDate.setHours(hours, minutes, 0, 0);

      return {
        ...activity,
        sortDate: activityDate,
      };
    });

    // Sort activities by date/time
    activitiesWithTime.sort(
      (a, b) => a.sortDate.getTime() - b.sortDate.getTime()
    );

    // Find the next activity (first one after current time)
    const futureActivities = activitiesWithTime.filter((a) => a.sortDate > now);

    return futureActivities.length > 0
      ? futureActivities[0]
      : activitiesWithTime[0]; // Fallback to the earliest if no future activities
  }, [activeTrip]);

  // Format event time for display
  const formatEventTime = (activity) => {
    if (!activity) return '';
    return `${activity.dayDate} • ${activity.time}`;
  };

  return (
    <div className='trip-home-container'>
      <div
        className='trip-overview-grid'
        onClick={() => {
          console.log(activeTrip);
        }}
      >
        {/* Weather section */}
        {/* <Meteo /> */}
        meteo
        {/* Next event section */}
        <div className='overview-card event-card'>
          <h2>Prossimo Evento</h2>
          {nextEvent ? (
            <div className='event-info'>
              <h3>{nextEvent.title || nextEvent.name}</h3>
              <p>{formatEventTime(nextEvent)}</p>
              <p>{nextEvent.location || `Giorno ${nextEvent.dayNumber}`}</p>
            </div>
          ) : (
            <div className='event-info empty-events'>
              <p>Nessun evento programmato</p>
            </div>
          )}
        </div>
        {/* Economic balance section */}
        <div className='overview-card balance-card'>
          <h2>Bilancio Economico</h2>
          <div className='balance-total'>
            <p>Spese Totali: €{activeTrip.totalExpenses.toFixed(2)}</p>
          </div>
          <div className='balance-list'>
            {activeTrip.balances.map((balance, index) => (
              <div
                key={index}
                className={`balance-item ${
                  balance.amount < 0 ? 'negative' : 'positive'
                }`}
              >
                <span>{balance.username}:</span>
                <span>€{balance.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* To-do section */}
        <div className='overview-card todo-card'>
          <h2>Da Fare</h2>
          <div className='todo-list'>
            {activeTrip?.mainToDo?.map((todo, index) => (
              <div
                key={index}
                className='todo-item'
              >
                <input
                  type='checkbox'
                  checked={todo.checked}
                  readOnly
                />
                <span className={todo.checked ? 'completed' : ''}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripHome;
