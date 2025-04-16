import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripHome = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get('/api/trips')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, []);

  return (
    <div>
      <h1>Trips</h1>
      {Array.isArray(trips) && trips.length > 0 ? (
        trips.map(trip => (
          <div key={trip.id}>
            <h2>{trip.name}</h2>
            <p>{trip.description}</p>
          </div>
        ))








export default TripHome;};  );    </div>      )}        <p>No trips available</p>      ) : (  );
};

export default TripHome;