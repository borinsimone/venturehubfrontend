import React, { useEffect, useState } from 'react';
import './popular.css';
import Loader from '../../../components/common/Loader';

interface PopularTrip {
  id: string;
  title: string;
  destination: string;
  description: string;
  imageUrl: string;
  rating: number;
}

const Popular: React.FC = () => {
  const [popularTrips, setPopularTrips] = useState<PopularTrip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch popular trips - replace with actual API call
    const fetchPopularTrips = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockTrips: PopularTrip[] = [
            {
              id: '1',
              title: 'Paris Adventure',
              destination: 'Paris, France',
              description: 'Experience the magic of the City of Lights',
              imageUrl: 'https://source.unsplash.com/random/800x600/?paris',
              rating: 4.8,
            },
            {
              id: '2',
              title: 'Tokyo Exploration',
              destination: 'Tokyo, Japan',
              description:
                'Discover the blend of tradition and modern technology',
              imageUrl: 'https://source.unsplash.com/random/800x600/?tokyo',
              rating: 4.9,
            },
            {
              id: '3',
              title: 'New York City Trip',
              destination: 'New York, USA',
              description: 'The city that never sleeps awaits your visit',
              imageUrl: 'https://source.unsplash.com/random/800x600/?newyork',
              rating: 4.7,
            },
          ];
          setPopularTrips(mockTrips);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching popular trips:', error);
        setLoading(false);
      }
    };

    fetchPopularTrips();
  }, []);

  if (loading) {
    return <Loader size='medium' />;
  }

  return (
    <div className='popular-container'>
      <div className='popular-header'>
        <button
          className='back-button'
          onClick={() => window.history.back()}
          aria-label='Torna indietro'
        >
          <span className='back-icon'>←</span>
          <span className='back-text'>Indietro</span>
        </button>
        <h1 className='popular-title'>Viaggi Popolari</h1>
      </div>
      <p className='popular-subtitle'>
        Scopri le destinazioni di tendenza e le esperienze amate dai viaggiatori
      </p>

      <div className='trip-grid'>
        {popularTrips.map((trip) => (
          <div
            className='trip-card'
            key={trip.id}
          >
            <div className='trip-image-container'>
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className='trip-image'
              />
            </div>
            <div className='trip-content'>
              <h2 className='trip-title'>{trip.title}</h2>
              <h3 className='trip-destination'>{trip.destination}</h3>
              <p className='trip-description'>{trip.description}</p>
              <p className='trip-rating'>Valutazione: {trip.rating}/5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
