import './home.css';

// Define the type for popular destinations
type PopularDestination = {
  id: string;
  name: string;
  image: string;
};

function Popular() {
  // Create array of popular destination types
  const popularDestinations: PopularDestination[] = [
    {
      id: '1',
      name: 'montagna',
      image: 'https://picsum.photos/seed/mountains/500',
    },
    {
      id: '2',
      name: 'lago',
      image: 'https://picsum.photos/seed/lake/500',
    },
    {
      id: '3',
      name: 'mare',
      image: 'https://picsum.photos/seed/sea/500',
    },
    {
      id: '4',
      name: 'città',
      image: 'https://picsum.photos/seed/city/500',
    },
  ];

  return (
    <div className='popular'>
      <div className='title'>Popular</div>
      <div className='slider'>
        {popularDestinations.map((destination) => (
          <div
            className='popular-card'
            key={destination.id}
          >
            <div className='popular-card-image'>
              <img
                src={destination.image}
                alt={`Destinazione: ${destination.name}`}
              />
            </div>
            <div className='popular-card-content'>
              <h3>{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
