import { BiChevronRight } from 'react-icons/bi';
import '../Home.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';

// Define the Trip type
type Trip = {
  id: string;
  destination: string;
  image: string;
  date: string;
};

function Prev() {
  const navigate = useNavigate();
  const { setActiveTrip } = useContext(GlobalContext);

  // Create an array of past trips
  const pastTrips: Trip[] = [
    {
      id: '1',
      destination: 'Spagna',
      image: 'https://picsum.photos/seed/spain/500',
      date: '5 gennaio',
    },
    {
      id: '2',
      destination: 'Germania',
      image: 'https://picsum.photos/seed/germany/500',
      date: '10 febbraio',
    },
    {
      id: '3',
      destination: 'Grecia',
      image: 'https://picsum.photos/seed/greece/500',
      date: '15 marzo',
    },
  ];

  const handleTripClick = (trip: Trip) => {
    setActiveTrip(trip);
    navigate(`/dashboard/trip/${trip.id}`);
  };

  return (
    <motion.div
      key='prev'
      className='prev-slider'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {pastTrips.map((trip) => (
        <div
          className='trip-card'
          key={trip.id}
          onClick={() => handleTripClick(trip)}
        >
          <img
            src={trip.image}
            alt={`Viaggio in ${trip.destination}`}
          />
          <div className='text-wrapper'>
            <div className='title'>
              {trip.destination}
              <BiChevronRight size='25px' />
            </div>
            <div className='date'>{trip.date}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default Prev;
