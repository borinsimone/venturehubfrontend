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

function Next() {
  const navigate = useNavigate();
  const { setActiveTrip } = useContext(GlobalContext);

  // Create an array of upcoming trips
  const upcomingTrips: Trip[] = [
    {
      id: '1',
      destination: 'Italia',
      image: 'https://picsum.photos/seed/italy/500',
      date: '10 aprile',
      todos: [
        { text: 'Prenotare hotel a Roma', checked: true },
        { text: 'Comprare adattatore elettrico', checked: false },
        { text: 'Cambiare valuta', checked: false },
      ],
      days: [
        {
          day: '1',
          activities: [
            {
              name: 'Colosseo',
              icon: 'monument',
              time: '10:00',
              description: 'Visita guidata al Colosseo e Foro Romano',
              type: 'cultura',
            },
            {
              name: 'Pranzo',
              icon: 'food',
              time: '13:30',
              description: 'Ristorante Da Luigi vicino al Pantheon',
              type: 'ristorazione',
            },
          ],
        },
        {
          day: '2',
          activities: [
            {
              name: 'Musei Vaticani',
              icon: 'museum',
              time: '09:00',
              description:
                'Tour della Cappella Sistina e Basilica di San Pietro',
              type: 'cultura',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      destination: 'Canada',
      image: 'https://picsum.photos/seed/canada/500',
      date: '15 maggio',
      todos: [
        { text: 'Prenotare escursione cascate', checked: true },
        { text: 'Controllare il visto', checked: true },
        { text: 'Comprare abbigliamento invernale', checked: false },
      ],
      days: [
        {
          day: '1',
          activities: [
            {
              name: 'Cascate del Niagara',
              icon: 'nature',
              time: '11:00',
              description: 'Gita in barca alle cascate',
              type: 'natura',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      destination: 'Giappone',
      image: 'https://picsum.photos/seed/japan/500',
      date: '2 giugno',
      todos: [
        { text: 'Comprare Japan Rail Pass', checked: false },
        { text: 'Prenotare ryokan a Kyoto', checked: false },
      ],
      days: [
        {
          day: '1',
          activities: [
            {
              name: 'Tokyo Tower',
              icon: 'landmark',
              time: '16:00',
              description: 'Vista panoramica di Tokyo',
              type: 'attrazione',
            },
          ],
        },
      ],
    },
    {
      id: '4',
      destination: 'Francia',
      image: 'https://picsum.photos/seed/france/500',
      date: '20 luglio',
      todos: [
        { text: 'Prenotare biglietti Louvre', checked: false },
        { text: 'Organizzare trasporto aeroporto', checked: true },
      ],
      days: [
        {
          day: '1',
          activities: [
            {
              name: 'Torre Eiffel',
              icon: 'landmark',
              time: '10:00',
              description: 'Salita alla cima e pranzo al ristorante',
              type: 'attrazione',
            },
          ],
        },
      ],
    },
  ];

  const handleTripClick = (trip: Trip) => {
    setActiveTrip(trip);
    navigate(`/dashboard/trip/${trip.id}`);
  };

  return (
    <motion.div
      key='next'
      className='next-slider'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {upcomingTrips.map((trip) => (
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

export default Next;
