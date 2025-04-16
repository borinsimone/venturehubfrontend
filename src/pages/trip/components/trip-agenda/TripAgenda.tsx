import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/GlobalContext';
import './TripAgenda.scss';
import TripNavbar from '../../TripNavbar';

// Importazione componenti
import TripAgendaHeader from './components/TripAgendaHeader';
import DaysNavigation from './components/DaysNavigation';
import ActivityTimeline from './components/ActivityTimeline';

// Importazione tipi
import { Day } from './types';

function TripAgenda() {
  const { activeTrip } = useGlobalContext();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);

  // Reset selected day when trip changes
  useEffect(() => {
    setSelectedDay(0);
  }, [activeTrip?.id]);

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

  const days: Day[] = activeTrip.days;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='trip-agenda'>
      <TripAgendaHeader
        trip={activeTrip}
        onGoBack={handleGoBack}
      />

      <DaysNavigation
        days={days}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      <ActivityTimeline activities={days[selectedDay].activities} />

      <TripNavbar />
    </div>
  );
}

export default TripAgenda;
