import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
};

const Dashboard = () => {
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [pastTrips, setPastTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Mock data - would normally fetch from API
    setUpcomingTrips([
      {
        id: '1',
        title: 'Summer in Rome',
        destination: 'Rome, Italy',
        startDate: '2025-06-15',
        endDate: '2025-06-25',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      },
      {
        id: '2',
        title: 'Tokyo Adventure',
        destination: 'Tokyo, Japan',
        startDate: '2025-09-10',
        endDate: '2025-09-20',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      },
    ]);

    setPastTrips([
      {
        id: '3',
        title: 'Paris Weekend',
        destination: 'Paris, France',
        startDate: '2024-12-10',
        endDate: '2024-12-12',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      },
    ]);
  }, []);

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <h1>My Trips</h1>
        <Link
          to='/dashboard/trip/new'
          className='new-trip-btn'
        >
          Plan New Trip
        </Link>
      </div>

      <section className='trip-section'>
        <h2>Upcoming Trips</h2>
        <div className='trips-grid'>
          {upcomingTrips.map((trip) => (
            <Link
              to={`/dashboard/trip/${trip.id}`}
              key={trip.id}
              className='trip-card'
            >
              <div
                className='trip-image'
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className='trip-info'>
                <h3>{trip.title}</h3>
                <p>{trip.destination}</p>
                <p className='trip-dates'>
                  {new Date(trip.startDate).toLocaleDateString()} -{' '}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='trip-section'>
        <h2>Past Trips</h2>
        <div className='trips-grid'>
          {pastTrips.map((trip) => (
            <Link
              to={`/dashboard/trip/${trip.id}`}
              key={trip.id}
              className='trip-card past'
            >
              <div
                className='trip-image'
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className='trip-info'>
                <h3>{trip.title}</h3>
                <p>{trip.destination}</p>
                <p className='trip-dates'>
                  {new Date(trip.startDate).toLocaleDateString()} -{' '}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
