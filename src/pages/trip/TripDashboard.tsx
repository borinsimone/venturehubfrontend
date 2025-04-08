import { useParams } from 'react-router-dom';
import TripTabs from '../../components/trip/TripTabs';
import { useEffect, useState } from 'react';

type TripDetails = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: string[];
};

const TripDashboard = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - would fetch trip details from your backend
    setLoading(true);
    setTimeout(() => {
      setTrip({
        id: tripId || '1',
        title: 'Summer in Rome',
        destination: 'Rome, Italy',
        startDate: '2025-06-15',
        endDate: '2025-06-25',
        participants: ['You', 'John', 'Sarah', 'Mike'],
      });
      setLoading(false);
    }, 500);
  }, [tripId]);

  if (loading) {
    return <div className='loading'>Loading trip details...</div>;
  }

  if (!trip) {
    return <div className='error'>Trip not found</div>;
  }

  return (
    <div className='trip-dashboard'>
      <div className='trip-header'>
        <h1>{trip.title}</h1>
        <div className='trip-meta'>
          <p className='destination'>{trip.destination}</p>
          <p className='dates'>
            {new Date(trip.startDate).toLocaleDateString()} -{' '}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
          <p className='participants'>
            Travelers: {trip.participants.join(', ')}
          </p>
        </div>
      </div>

      {/* This component contains the 4 tabs: General, Agenda, Money, Utilities */}
      <TripTabs tripId={trip.id} />
    </div>
  );
};

export default TripDashboard;
