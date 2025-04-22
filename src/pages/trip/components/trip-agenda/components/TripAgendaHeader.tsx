import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { Trip } from '../types';
import { useNavigate } from 'react-router-dom';

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
        aria-label='Go back'
      >
        <FaArrowLeft />
      </button>
      <h1>{trip.title || `${trip.destination} Trip Plan`}</h1>
    </div>
  );
}

export default TripAgendaHeader;
