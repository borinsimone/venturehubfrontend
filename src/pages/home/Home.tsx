import { useState } from 'react';
import { FaSearch, FaUserCircle, FaBell, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { useGlobalContext } from '../../context/GlobalContext';
import { motion, AnimatePresence } from 'framer-motion'; // Add framer-motion import

// Define trip types
type Trip = {
  id: string;
  destination: string;
  image: string;
  date: string;
  title?: string;
  participants?: string[];
  balances?: {
    username: string;
    amount: number;
  }[];
  totalExpenses?: number;
  archived?: boolean;
  completed?: boolean; // Added completed property
  mainToDo?: {
    text: string;
    checked: boolean;
  }[];
  days?: {
    day: number;
    date: string;
    activities: {
      id: string;
      title: string;
      type:
        | 'flight'
        | 'hotel'
        | 'park'
        | 'hiking'
        | 'food'
        | 'other'
        | 'trasporto'
        | 'alloggio'
        | 'escursione'
        | 'ristorazione'
        | 'cultura'
        | 'shopping'
        | 'natura'
        | 'relax'
        | 'tempo libero';
      time: string;
      details?: string;
      location?: string;
      from?: string;
      to?: string;
      completed?: boolean;
    }[];
  }[];
};

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [tripSearchQuery, setTripSearchQuery] = useState(''); // New state for trip search
  const { setActiveTrip } = useGlobalContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recent'>('upcoming'); // Added state for active tab

  const [tripsData, setTripsData] = useState<Trip[]>([
    {
      id: '1',
      destination: 'Roma, Italia',
      title: 'Vacanza a Roma',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      date: '10 - 15 Giugno',
      startDate: '2024-06-10',
      endDate: '2024-06-15',
      completed: false,
      participants: ['Marco', 'Giulia', 'Alessandro', 'Sofia'],
      totalExpenses: 1250.75,
      balances: [
        { username: 'Tu', amount: -145.5 },
        { username: 'Marco', amount: 78.3 },
        { username: 'Giulia', amount: 125.8 },
        { username: 'Alessandro', amount: -58.6 },
      ],
      todos: [
        { text: 'Prenotare volo Roma', checked: true },
        { text: 'Prenotare hotel centro storico', checked: true },
        { text: 'Comprare biglietti Musei Vaticani', checked: false },
        { text: 'Prenotare tour Colosseo', checked: false },
        { text: 'Preparare valigia', checked: false },
      ],
      days: [
        {
          day: 1,
          date: '10 Giugno',
          activities: [
            {
              id: 'a1',
              name: 'Arrivo a Roma',
              icon: 'plane',
              time: '10:30 AM',
              description:
                "Atterraggio all'aeroporto di Fiumicino. Prendere il Leonardo Express per Roma Termini.",
              type: 'trasporto',
              from: 'Milano Malpensa',
              to: 'Roma Fiumicino',
              completed: false,
            },
            {
              id: 'a2',
              name: 'Check-in Hotel',
              icon: 'hotel',
              time: '1:00 PM',
              description:
                "Check-in all'Hotel Artemide. Abbiamo prenotato due camere doppie con colazione inclusa.",
              type: 'alloggio',
              location: 'Via Nazionale, 22',
              completed: false,
            },
            {
              id: 'a3',
              name: 'Passeggiata Centro Storico',
              icon: 'walk',
              time: '3:30 PM',
              description:
                'Passeggiata esplorativa nel centro di Roma. Fontana di Trevi, Piazza di Spagna e Pantheon.',
              type: 'escursione',
              location: 'Centro storico',
              completed: false,
            },
            {
              id: 'a4',
              name: 'Cena Trastevere',
              icon: 'food',
              time: '8:00 PM',
              description:
                'Cena in una trattoria tradizionale a Trastevere. Prenotazione a nome di Marco.',
              type: 'ristorazione',
              location: 'Trattoria Da Enzo, Trastevere',
              completed: false,
            },
          ],
        },
        {
          day: 2,
          date: '11 Giugno',
          activities: [
            {
              id: 'b1',
              name: 'Colosseo e Foro Romano',
              icon: 'monument',
              time: '9:00 AM',
              description:
                'Tour guidato del Colosseo, Foro Romano e Palatino. Tour di 3 ore con guida italiana. Portare acqua e cappello per il sole.',
              type: 'cultura',
              location: 'Colosseo, Via dei Fori Imperiali',
              completed: false,
            },
            {
              id: 'b2',
              name: 'Pranzo',
              icon: 'food',
              time: '1:00 PM',
              description:
                'Pranzo presso Pizzeria ai Marmi. Famosa per la pizza romana sottile e croccante.',
              type: 'ristorazione',
              location: 'Via dei Marmi, 5',
              completed: false,
            },
            {
              id: 'b3',
              name: 'Musei Capitolini',
              icon: 'museum',
              time: '3:00 PM',
              description:
                'Visita ai Musei Capitolini, la più antica collezione pubblica di arte al mondo. Da vedere la Lupa Capitolina e la statua di Marco Aurelio.',
              type: 'cultura',
              location: 'Piazza del Campidoglio, 1',
              completed: false,
            },
          ],
        },
        {
          day: 3,
          date: '12 Giugno',
          activities: [
            {
              id: 'c1',
              name: 'Musei Vaticani',
              icon: 'museum',
              time: '8:30 AM',
              description:
                'Visita dei Musei Vaticani e Cappella Sistina. Ingresso alle 9:00 con prenotazione. Dress code: spalle coperte e niente pantaloncini corti.',
              type: 'cultura',
              location: 'Viale Vaticano',
              completed: false,
            },
            {
              id: 'c2',
              name: 'Basilica di San Pietro',
              icon: 'church',
              time: '12:00 PM',
              description:
                'Visita della Basilica di San Pietro e possibilità di salire sulla cupola per una vista panoramica (7€ ascensore + 320 scalini).',
              type: 'cultura',
              location: 'Piazza San Pietro',
              completed: false,
            },
            {
              id: 'c3',
              name: 'Shopping Via del Corso',
              icon: 'shopping',
              time: '3:30 PM',
              description:
                'Pomeriggio di shopping lungo Via del Corso e strade limitrofe. Negozi di marchi italiani e internazionali.',
              type: 'shopping',
              location: 'Via del Corso',
              completed: false,
            },
          ],
        },
        {
          day: 4,
          date: '13 Giugno',
          activities: [
            {
              id: 'd1',
              name: 'Villa Borghese',
              icon: 'park',
              time: '9:30 AM',
              description:
                'Visita della Galleria Borghese (prenotazione obbligatoria) e passeggiata nei giardini di Villa Borghese. Possibilità di noleggiare barchette sul laghetto.',
              type: 'cultura',
              location: 'Piazzale Scipione Borghese, 5',
              completed: false,
            },
            {
              id: 'd2',
              name: 'Pranzo Piazza del Popolo',
              icon: 'food',
              time: '1:00 PM',
              description:
                "Pranzo in uno dei caffè storici di Piazza del Popolo. Consigliato Caffè Rosati per l'atmosfera e la posizione.",
              type: 'ristorazione',
              location: 'Piazza del Popolo',
              completed: false,
            },
            {
              id: 'd3',
              name: "Castel Sant'Angelo",
              icon: 'castle',
              time: '3:30 PM',
              description:
                "Visita di Castel Sant'Angelo, antica fortezza e prigione papale. Belle viste sul Tevere e San Pietro dalla terrazza.",
              type: 'cultura',
              location: 'Lungotevere Castello, 50',
              completed: false,
            },
          ],
        },
        {
          day: 5,
          date: '14 Giugno',
          activities: [
            {
              id: 'e1',
              name: 'Parco degli Acquedotti',
              icon: 'park',
              time: '10:00 AM',
              description:
                'Escursione al Parco degli Acquedotti per vedere i maestosi acquedotti romani. Portare macchina fotografica e acqua.',
              type: 'natura',
              location: 'Via Lemonia',
              completed: false,
            },
            {
              id: 'e2',
              name: 'Quartiere Ostiense',
              icon: 'city',
              time: '2:00 PM',
              description:
                "Visita del quartiere Ostiense per vedere i murales e l'arte urbana. Zona con molti locali trendy e ristoranti.",
              type: 'cultura',
              location: 'Quartiere Ostiense',
              completed: false,
            },
            {
              id: 'e3',
              name: 'Cena di arrivederci',
              icon: 'food',
              time: '8:00 PM',
              description:
                'Cena speciale di arrivederci in un ristorante tipico romano. Menu degustazione di piatti tradizionali.',
              type: 'ristorazione',
              location: 'Ristorante Roscioli, Via dei Giubbonari',
              completed: false,
            },
          ],
        },
        {
          day: 6,
          date: '15 Giugno',
          activities: [
            {
              id: 'f1',
              name: 'Check-out',
              icon: 'hotel',
              time: '10:00 AM',
              description:
                "Check-out dall'hotel. Possibilità di lasciare i bagagli alla reception se necessario.",
              type: 'alloggio',
              location: 'Hotel Artemide',
              completed: false,
            },
            {
              id: 'f2',
              name: 'Tempo libero',
              icon: 'city',
              time: '10:30 AM',
              description:
                'Tempo libero per ultimi acquisti o visite. Consigliata una passeggiata finale nel centro storico.',
              type: 'tempo libero',
              completed: false,
            },
            {
              id: 'f3',
              name: 'Partenza',
              icon: 'plane',
              time: '4:30 PM',
              description:
                'Partenza da Roma Fiumicino. Arrivo in aeroporto consigliato 2 ore prima della partenza. Prendere il Leonardo Express da Roma Termini.',
              type: 'trasporto',
              from: 'Roma Fiumicino',
              to: 'Milano Malpensa',
              completed: false,
            },
          ],
        },
      ],
    },
  ]);

  // Define popular destinations categories
  const popularCategories = [
    {
      name: 'Montagna',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    },
    {
      name: 'Spiaggia',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      name: 'Lago',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
    },
  ];

  // Filter trips based on active tab and search query
  const filteredTrips = tripsData
    .filter((trip) => {
      // First filter by completed status based on active tab
      const matchesTab =
        activeTab === 'upcoming' ? !trip.completed : trip.completed;

      // Then filter by search query if one exists
      const matchesSearch =
        tripSearchQuery.trim() === '' ||
        trip.destination
          .toLowerCase()
          .includes(tripSearchQuery.toLowerCase()) ||
        (trip.title &&
          trip.title.toLowerCase().includes(tripSearchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    })
    .slice(0, 3); // Take only the first 3

  const handlePlanTrip = () => {
    navigate('/dashboard/trip/new');
  };

  const handleTripClick = (trip: Trip) => {
    setActiveTrip(trip);
    navigate(`/dashboard/trip/${trip.id}`);
  };

  // Function to handle tab switching
  const handleTabClick = (tab: 'upcoming' | 'recent') => {
    setActiveTab(tab);
  };

  // Function to clear search
  const clearTripSearch = () => {
    setTripSearchQuery('');
  };

  return (
    <div className='home'>
      <div className='top-bar'>
        <div className='user-img'>
          <img
            src='https://i.pravatar.cc/150?img=12'
            alt='Profile'
          />
        </div>
        <div className='notification'>
          <FaBell
            size={20}
            color='#000'
          />
        </div>
      </div>

      <div className='main-content'>
        <h1 className='title'>
          Scopri
          <br />
          un nuovo mondo
        </h1>
        <button onClick={handlePlanTrip}>Pianifica Avventura</button>

        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='Location, Country...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch style={{ position: 'absolute', right: '20px' }} />
        </div>
      </div>

      <div className='popular'>
        <h2 className='title'>
          Popolari{' '}
          <div
            className='more'
            onClick={() => {
              navigate('popular-trip');
            }}
          >
            Scopri di più
          </div>
        </h2>
        <div className='slider'>
          {popularCategories.map((category, index) => (
            <div
              key={index}
              className='popular-card'
            >
              <div className='popular-card-image'>
                <img
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className='planned'>
        <h2 className='title'>
          <span
            className={activeTab === 'upcoming' ? 'active' : 'inactive'}
            onClick={() => handleTabClick('upcoming')}
          >
            Prossimi
          </span>
          <span
            className={activeTab === 'recent' ? 'active' : 'inactive'}
            onClick={() => handleTabClick('recent')}
          >
            Recenti
          </span>
        </h2>

        {/* Trip search input */}
        <div className='trip-search-wrapper'>
          <input
            type='text'
            placeholder='Cerca viaggi...'
            value={tripSearchQuery}
            onChange={(e) => setTripSearchQuery(e.target.value)}
            className='trip-search-input'
          />
          <FaSearch className='trip-search-icon' />
          {tripSearchQuery && (
            <button
              className='trip-search-clear'
              onClick={clearTripSearch}
            >
              ×
            </button>
          )}
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'upcoming' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'upcoming' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className='next-slider'
          >
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className='trip-card'
                  onClick={() => handleTripClick(trip)}
                >
                  <img
                    src={trip.image}
                    alt={trip.destination}
                  />
                  <div className='text-wrapper'>
                    <h3 className='title'>
                      {trip.destination.split(',')[0]}
                      <FaChevronRight size={14} />
                    </h3>
                    <p className='date'>
                      {trip.startDate &&
                        new Date(trip.startDate).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                        })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                {tripSearchQuery
                  ? `Nessun risultato per "${tripSearchQuery}"`
                  : `Nessun viaggio ${
                      activeTab === 'upcoming' ? 'in programma' : 'recente'
                    }`}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;
