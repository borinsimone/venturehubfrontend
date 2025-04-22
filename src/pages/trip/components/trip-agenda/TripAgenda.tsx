import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';
import './TripAgenda.css';
import TripNavbar from '../../TripNavbar';

import TripAgendaHeader from './components/TripAgendaHeader';
import DaysNavigation from './components/DaysNavigation';
import ActivityTimeline from './components/ActivityTimeline';

import { Day } from './types';

function TripAgenda() {
  const { activeTrip, updateTrip } = useGlobalContext();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState<Day[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Reset selected day when trip changes and set loading state
  useEffect(() => {
    setIsLoading(true);
    if (activeTrip?.days) {
      setDays([...activeTrip.days]);
      setSelectedDay(0);
    }
    setIsLoading(false);
  }, [activeTrip?.id]);

  // Non fare rendering fino a quando non siamo sicuri che i dati siano caricati
  if (isLoading) {
    return <div className='loading'>Caricamento...</div>;
  }

  // Check if activeTrip exists and if it has days array
  if (!activeTrip || !activeTrip.days || activeTrip.days.length === 0) {
    return (
      <div className='trip-agenda'>
        <div className='trip-agenda-empty'>
          <h3>Nessuna attività pianificata</h3>
          <p>Aggiungi attività al tuo itinerario</p>
          <button className='add-activity-btn'>Aggiungi attività</button>
        </div>
        <TripNavbar />
      </div>
    );
  }

  // Verifica che selectedDay sia valido
  if (selectedDay >= days.length) {
    setSelectedDay(0);
    return null; // Avoid rendering with invalid selectedDay
  }

  // Verifica che il giorno selezionato abbia activities
  const currentDayActivities = days[selectedDay]?.activities || [];

  const handleActivityUpdate = (updatedActivity, dayIndex) => {
    const updatedDays = [...days];
    const activityIndex = updatedDays[dayIndex].activities.findIndex(
      (a) => a.id === updatedActivity.id
    );

    if (activityIndex !== -1) {
      // Update existing activity
      updatedDays[dayIndex].activities[activityIndex] = updatedActivity;
    } else {
      // Add new activity
      updatedDays[dayIndex].activities.push(updatedActivity);
    }

    setDays(updatedDays);

    // Update the trip in the global context
    if (activeTrip) {
      updateTrip({
        ...activeTrip,
        days: updatedDays,
      });
    }
  };

  const handleActivityComplete = (activityId, dayIndex) => {
    const updatedDays = [...days];
    const activityIndex = updatedDays[dayIndex].activities.findIndex(
      (a) => a.id === activityId
    );

    if (activityIndex !== -1) {
      // Always mark as completed (don't toggle)
      updatedDays[dayIndex].activities[activityIndex].completed = true;

      setDays(updatedDays);

      // Update the trip in the global context
      if (activeTrip) {
        updateTrip({
          ...activeTrip,
          days: updatedDays,
        });
      }
    }
  };

  const handleActivityDelete = (activityId, dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
      (a) => a.id !== activityId
    );

    setDays(updatedDays);

    // Update the trip in the global context
    if (activeTrip) {
      updateTrip({
        ...activeTrip,
        days: updatedDays,
      });
    }
  };

  return (
    <div className='trip-agenda'>
      <TripAgendaHeader
        trip={activeTrip}
        onGoBack={() => navigate(-1)}
      />

      <DaysNavigation
        days={days}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      <div className='day-content'>
        <ActivityTimeline
          activities={currentDayActivities}
          dayIndex={selectedDay}
          onActivityUpdate={handleActivityUpdate}
          onActivityDelete={handleActivityDelete}
          onActivityComplete={handleActivityComplete}
        />
      </div>

      <TripNavbar />
    </div>
  );
}

export default TripAgenda;
