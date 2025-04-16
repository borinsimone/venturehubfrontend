import { FaArrowLeft } from 'react-icons/fa';
import { Trip } from '../types';

interface TripAgendaHeaderProps {
  trip: Trip;
  onGoBack: () => void;
}

function TripAgendaHeader({ trip, onGoBack }: TripAgendaHeaderProps) {
  return (
    <div className='trip-agenda-header'>
      <button
        className='back-button'
        onClick={onGoBack}
      >
        <FaArrowLeft />
      </button>
      <h1>{trip.title || `${trip.destination} Trip Plan`}</h1>
    </div>
  );
}

export default TripAgendaHeader;
